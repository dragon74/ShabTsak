/* eslint-disable react/no-unescaped-entities */
import imgSoldier from '/images/soldier.png';


export default function Logo() {
  return (
    <div className="logo-comp">
      <img src={imgSoldier} alt="imgSoldier" width={35}/>
      <h1>שבצ"ק</h1>
    </div>
  )
}
