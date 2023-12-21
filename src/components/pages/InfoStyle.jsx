import React, { useEffect, useState } from 'react';
import data from '../../data/Données-Genres-musicaux.json';
import { useNavigate, useParams} from 'react-router-dom';
import SelectionInfo from '../SelectionInfo/SelectionInfo';
import { accentsTidy } from '../../libs/utils';
import Menu from './Menu/Menu';



const InfoStyle = () => {
    const params = useParams();
    const isStyleData = data.filter((item) => accentsTidy(item.style) === params.style);

    const navigate = useNavigate(); // Obtenez la fonction de navigation

    useEffect(() => {
        if (!isStyleData[0]) {
            // Si les données ne sont pas trouvées, redirigez l'utilisateur
            navigate('/');
        }
    }, [isStyleData, navigate]); // Assurez-vous d'ajouter navigate comme dépendance

    const styleData = isStyleData[0];
    console.log(isStyleData);
    return (
        <main>
            <section className="container">
                <SelectionInfo styleData={styleData}/>
            </section>

        </main>
    )
};


export default InfoStyle;