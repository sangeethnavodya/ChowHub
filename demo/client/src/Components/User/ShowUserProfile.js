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
    if (isLoading) {
        return <div>Loading post details...</div>;
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
            </Card>
            <Card className='name-label'>
                <ShowOtherUser />
            </Card>
        </div>

    )

}

export default Profile