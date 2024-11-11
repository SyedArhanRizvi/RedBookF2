import React, { useState } from 'react';
import "./UserPost.css";
import UserPCard from '../../Cards/UserPCard';
import { useAppContext } from '../../../../Context/userAuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router';

function UserPost() {
    const { rbUserPosts } = useAppContext();
    const [bookForEdit, setBookForEdit] = useState();
    const [bookId, setBookId] = useState();
    const navigator = useNavigate();
    const [postDeletePopUp, setPostDeletePopUp] = useState(false);

    const handleEdit = async (bookId) => {
        try {
            const book = await axios.get(`http://localhost:3500/api/books/readThisBook${bookId}`);
            setBookForEdit(book.data.book);
            if(bookForEdit) {
                localStorage.setItem("AUTHOR_BOOK", JSON.stringify(bookForEdit)); 
                if(book.status === 200) {
                    navigator("/bookEditorPage");
                }    
            }
            
        } catch (error) {
            console.log("There is some errors in your handle edit section so plz fix the bug first ", error);
        }
    };
    
    const handleDelete = async () => {
        console.log(bookId);
        try {
            const book = await axios.delete(`http://localhost:3500/api/books/deleteBook${bookId}`);
            if(book.status === 200) {
                window.location.reload();
            }
            setPostDeletePopUp((prev)=>!prev)
        } catch (error) {
            console.log("There is some errors in your handle delete function plz fix the bug first ", error);   
        } 
    };

    return (
        <div className='cartContainer'>
            {
        postDeletePopUp && <div className="postDeletePopUp">
        <p className="warningText">Are you sure you want to delete this post? This action cannot be undone.</p>
        <div className="buttonContainer">
            <button className="deleteButton" onClick={handleDelete}>Delete Post</button>
            <button className="cancelButton" onClick={()=>setPostDeletePopUp((prev)=>!prev)}>Cancel</button>
        </div>
    </div>
    
      }
            {/* <h1>Your Books</h1> */}
            <div className='booksList'>
                {rbUserPosts.map(book => (
                    <UserPCard 
                        key={book._id} 
                        book={book} 
                        onEdit={handleEdit} 
                        onDelete={()=>{
                        setPostDeletePopUp((prev)=>!prev);
                        setBookId(book._id);
                    }} 
                    />
                ))}
            </div>
        </div>
    );
}

export default UserPost;
