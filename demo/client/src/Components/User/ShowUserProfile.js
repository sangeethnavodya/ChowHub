import { Button, Card, Form } from 'antd';
import axios from 'axios'
import react, { useEffect, useState } from 'react'
import '../ProfileComponent/profile.css'
import ShowPostUser from '../ProfileComponent/ShowPostUser';


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
    function handleOpenWidget() {
        var myWidget = window.cloudinary.createUploadWidget({
            cloudName: 'dugke0heo',
            uploadPreset: 'nxlpfvfq'
        }, (error, result) => {
            if (!error && result && result.event === "success") {
                console.log('Done! Here is the image info: ', result.info);
                setImage({ ...image, "profileURL": result.info.url })
                setIsUpload(true)
            }
        }
        )
        myWidget.open();
    }

    function handleUpload() {
        axios.put('http://localhost:8080/user/' + localStorage.getItem('otherId'), image).then(
            upload => {
                console.log(upload)
                window.location.reload();
            }
        )
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
         
            
        
            {isUpload && (
                <Button onClick={() => handleUpload()} className='upload-button'>
                    Upload Your Profile
                </Button>
            )}
            <Card className='name-label'>
                <h1>{details.data.name}'s Profile</h1>
            </Card>
            <Card className='name-label'>
                <ShowPostUser />
            </Card>
        </div>

    )

}

export default Profile