import React, { useEffect, useRef, useState } from "react";
import  ReactDOM from "react-dom";
import axios from "axios";
// import {ErrorBoundary} from 'react-error-boundary'


const root = ReactDOM.createRoot(document.getElementById('root'));
const App=()=>{

    const [movies, setMovies]=useState([]);
    const [likedMovies , setlikedMovies] = useState([]);
    const [dislikedMovies , setdislikedMovies]=useState([]);


    const getMovies=async(input)=>{
        console.log(input);
        if(input===undefined)input = 'american pie'; 

        const moviesRequest = await axios.get(
            // "http://www.omdbapi.com/?s=harry&apikey=ee57e1b2"
            `http://www.omdbapi.com/?s=${input}&apikey=ee57e1b2`

        );
        // console.log(moviesRequest.data.Search);
        console.log(moviesRequest);
        setMovies (moviesRequest.data.Search);
        showSearchedmovies();
        // return moviesRequest.data.Search;
    }

    const textInput = useRef();

    const onInput = (e)=> {

        e.preventDefault();
        
        textInput.current.value ==="" ? alert("behen ke lawde kuch likh to....") :  getMovies (textInput.current.value);
    }

    useEffect(()=>{
        getMovies();
    },[]);
    
    const likeMovies=(movie)=>{
        setlikedMovies(prev=> ({...prev, movies}));
        console.log(likedMovies);
    }
    const dislikeMovies=(movie)=>{
        setdislikedMovies(prev=>({...prev,movies}));
        console.log(dislikedMovies);
    }
    const showAlllikedmovies=(Allmaal)=>{
        
    };
    const showAlldislikedmovies=(Alljhant)=>{

    };
    const showSearchedmovies=(()=>{
        
    })
    return(
        <div>
            <form onSubmit={(e)=>onInput(e)}>
                <label>Search
                    <input type={'text'} name='Enter title' ref={textInput} />
                </label>
                <button type="button" onClick={e=>showAlllikedmovies(e.target.value)}> sari maal movies</button>
                <button type="button" onClick={e=>showAlldislikedmovies(e.target.value)}> sari jhant movies</button>
            </form>
            {movies&&movies.length>0 ? movies.map(movies=>{
            return (
                <div>
                    <div>
                        <p>{movies.Title}</p>
                        <button type="button" onClick={e=>likeMovies(e.target.value)} > maal movie hai</button>
                        <button type="button" onClick={e=>dislikeMovies(e.target.value)}> jhant movie hai</button>
                    </div>
                </div>
                
            )
        }): ''}
        </div>
    )

}
ReactDOM.render(<App/>,document.getElementById('root'));