import { Button, Card, Form } from 'antd';
import axios from 'axios'
import react, { useEffect, useState } from 'react'
import '../ProfileComponent/profile.css'
import ShowPostUser from '../ProfileComponent/ShowPostUser';
import ShowOtherUser from './ShowOtherUser';


function Profile() {
    const [details, setdetails] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [isUpload, setIsUpload] = useState(false)
    const [FollowBTN, setFollowBTN] = useState('Follow');
    const [isFollow, setIsFollow] = useState(false)
    const [needToInit, setneedToInit] = useState(false)

    const [image, setImage] = useState({
        profileURL: "",
    })
    const [not, setNot] = useState(true)

    useEffect(() => {
        async function fetchData() {
            setIsLoading(true);
            await axios.get('http://localhost:8080/user/' + localStorage.getItem('otherName')).then(user => {
                console.log(user)
                setIsLoading(false)
                setdetails(user)
                if (user.data.profileURL !== null) {
                    setNot(true)
                }
            });
        }
        fetchData()
    }, []);

    useEffect(() => {
        setIsLoading(true)
        async function fetchData() {
            await axios.get('http://localhost:8080/follow/' + localStorage.getItem('userId') + "/" + localStorage.getItem('otherId')).then(
                user => {
                    console.log(user)
                    if (Object.keys(user.data).length === 0) {
                        console.log("d")
                        setIsLoading(false)
                        setFollowBTN("Follow")
                        setneedToInit(true)
                        setIsFollow(false)
                    }
                    else if(!user.data[0].isFollowed){
                        setFollowBTN("Follow")
                        setneedToInit(false)
                        setIsFollow(false)
                        
                    }
                    else if(user.data[0].isFollowed){
                        setFollowBTN("Unfollow")
                        setneedToInit(false)
                        setIsFollow(true)
                    }
                    else{
                        setIsLoading(false)
                        setFollowBTN("Unfollow")
                        setneedToInit(false)
                        setIsFollow(true)
                    }
                    
                }
            );
        }
        fetchData();
    }, []);
    const [Follow, setFollow] = useState({
        isFollowed: true,
        followerId: localStorage.getItem('userId'),
        userid: localStorage.getItem('otherId')

    })

    if (isLoading) {
        return <div>Loading post details...</div>;
    }
    function handleFollow() {
        if (needToInit){
            axios.post("http://localhost:8080/follow/upload",Follow)
            setneedToInit(false)
            setFollowBTN("Unfollow")
        }
        else if(!needToInit&&isFollow){
            axios.put("http://localhost:8080/follow/"+ localStorage.getItem('userId') + "/" + localStorage.getItem('otherId'))
            setFollowBTN("Follow")
        }
        else if(!needToInit&&!isFollow){
            axios.put("http://localhost:8080/follow/unfollow/"+ localStorage.getItem('userId') + "/" + localStorage.getItem('otherId'))
            setFollowBTN("UnFollow")
        }
    }







    return (

        <div>

            <Card className='profile-pic'>
                <img
                    src={details.data.profileURL}
                    height='100px'
                    width='100px'
                    alt='Profile'
                />
            </Card>

            <Card className='name-label'>
                <h1>{details.data.name}'s Profile</h1>
                <Button onClick={() => handleFollow()}>{FollowBTN}</Button>
            </Card>
            <Card className='name-label'>
                <ShowOtherUser />
            </Card>
        </div>

    )

}

export default Profile