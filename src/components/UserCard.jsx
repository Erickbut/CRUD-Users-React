import React from 'react'
import './styles/userCard.css'

const UserCard = ({user,deleteUserById ,setUpdateInfo,setFormIsClose}) => {
    const handleEdit=()=>{
        setUpdateInfo(user)
        setFormIsClose(false)
    }

    return (
        <article className='user'>
            <h2 className='user_name'>{`${user.first_name} ${user.last_name}`}</h2>
            <ul className='user_list'>
                <li className='user_item'><span className='user_span'>Email</span>{user.email}</li>
                <li className='user_item'><span className='user_span'>Birthday</span ><i className="user_gift fa-solid fa-gift">{user.birthday}</i></li>
            </ul>
            <footer className='user_footer'>
                <button className='user_btn' onClick={() => deleteUserById(user.id)}>
                <i className="user_trash fa-sharp fa-solid fa-user-xmark"></i></button>
                <button className='user_btn' onClick={handleEdit}>
                <i className="user_edit fa-solid fa-user-pen"></i>
                </button>
            </footer>
        </article>
    );
};

export default UserCard