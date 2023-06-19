import React, { useEffect, useState } from 'react';

import data from '../../Constants/data.json';

function DetailContent(props) {
    const [anime, setAnime] = useState(data[0]);
    const [genres, setGenres] = useState(null);
    const [studios, setStudios] = useState(null);

    function replaceWithBr() {
        return anime.description.replace(/\n/g, "<br />")
    }

    useEffect(() => {
        for (let index in data) {
            if (data[index].JPname === props.name) {
                setAnime(data[index]);
                break;
            }
        }

        let studio_string = "";
        for (let index in anime.studios) {
            if (index == anime.studios.length - 1) {
                studio_string = studio_string + anime.studios[index];
                break;
            }

            studio_string = studio_string + anime.studios[index] + ', ';
        }
        setStudios(studio_string);

        let genre_string = "";
        for (let index in anime.genres) {
            if (index == anime.genres.length - 1) {
                genre_string = genre_string + anime.genres[index];
                break;
            }

            genre_string = genre_string + anime.genres[index] + ', ';
        }
        setGenres(genre_string);

        console.log(anime.description)
    }, [props.name]);

    return (
        <div>
            <table style={{ 
                marginLeft: '2%', 
                marginBottom: 20,

                width: '96%', 
                backgroundColor: '#252525', 
                borderBottom: '1px solid #8B8B8B'
            }}>
                <tr>
                    <div style={{ 
                        marginLeft: 20, 

                        fontSize: 20, 
                        maxWidth: 700,
                        color: 'white',
                    }}> 
                        { anime.JPname } 
                    </div>
                </tr>
            </table>

            <table style={{ width: '96%', marginLeft: '2%', borderLeft: '1px solid #292929', borderRight: '1px solid #292929', borderBottom: '1px solid #292929' }}>
                <tr>
                    <td valign='top' width={300} style={{ borderRight: '1px solid #292929' }}>
                        <div style={{
                            marginLeft: '5%',
                            marginBottom: 20,

                            fontSize: 15, 
                            color: 'white', 
                            textAlign: 'center', 

                            width: '90%', 
                            borderBottom: '1px solid #8B8B8B'
                        }}>
                            English Titles: { anime.ENname }
                        </div>
            
                        <div>
                            <div style={{ marginBottom: 20, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <img src={anime.image}></img>
                            </div>

                            <div style={{
                                marginLeft: '5%',
                                marginBottom: 20,

                                fontSize: 15, 
                                color: 'white', 
                                textAlign: 'center', 

                                width: '90%', 
                                borderBottom: '1px solid #8B8B8B'
                            }}>
                                Information
                            </div>

                            <div style={{ marginLeft: 20, color: 'white' }}>
                                Aired: { anime.aired }
                            </div>

                            <div style={{ marginLeft: 20, color: 'white' }}>
                                Episode(s): { anime.episodes }
                            </div>

                            <div style={{ marginLeft: 20, color: 'white' }}>
                                Producer: { anime.producers[0] }
                            </div>

                            <div style={{ marginLeft: 20, color: 'white' }}>
                                Studio(s): {studios}
                            </div>

                            <div style={{ marginLeft: 20, color: 'white' }}>
                                Genre(s): {genres}
                            </div>
                        </div>
                    </td>

                    <td valign='top'>
                        <div style={{ 
                            marginLeft: '2%', 
                            marginBottom: 15,

                            color: 'white',
                            fontWeight: 'bold',

                            width: '90%', 
                            borderBottom: '1px solid #8B8B8B'
                        }}>
                            Synopsis
                        </div>

                        <p dangerouslySetInnerHTML={{__html: replaceWithBr()}} 
                            style={{ 
                            color: 'white',
                            width: '90%',

                            marginLeft: 30, 
                            marginBottom: 30
                        }}/>

                        <div style={{ 
                            marginLeft: '2%', 
                            marginBottom: 15,

                            color: 'white',
                            fontWeight: 'bold',

                            width: '94%', 
                            borderBottom: '1px solid #8B8B8B'
                        }}>
                            Characters
                        </div>

                        <div style={{ color: 'white' }}>
                            { anime.characters.map((elem, index) => {
                                return (
                                    <table style={{ marginLeft: '2%', width: '46%', display: 'inline-block' }}>
                                        <td valign='middle' style={{ width: '5%' }}>
                                            <img src={elem.image}></img>
                                        </td>
                                        <td valign='middle'>
                                            { elem.name }
                                        </td>
                                        <td>
                                            <table align='right'>
                                                <td valign='middle'>
                                                    { elem.voiceActor.name }
                                                </td>
                                                <td valign='middle'>
                                                    <img src={elem.voiceActor.image}></img>
                                                </td>
                                            </table>
                                        </td>
                                    </table>
                                )
                            }) }
                        </div>
                    </td>
                </tr>
            </table>
        </div>
    )
}

export default DetailContent;