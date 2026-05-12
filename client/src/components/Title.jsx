import React from 'react'

const Title = ({
    title1,
    title2,
    titleStyles,
    title2Styles,
    paraStyles,
    para,
}) => {
  return <div className={titleStyles}>
    <h4 className='text-solid'>{title1}</h4>
    <div className='flex flex-col xl:flex-row xl:justify-between'>
        <h1 className={`${title2Styles} capitalize`}>{title2}</h1>
        <p className={`${paraStyles} max-w-lg xl:place-self-end xl:relative xl:bottom-0`}>{para ? para : "Trouvez une voiture fiable avec des prix transparents, des inspections vérifiées, des options flexibles de retrait et de livraison, ainsi qu'un service client disponible 24h/24 et 7j/7 pour une expérience de location ou fluide."}</p>
    </div>
  </div>
};

export default Title