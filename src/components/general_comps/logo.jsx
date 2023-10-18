import imgSoldier from '/images/soldier.png';


export default function Logo() {
  return (
    <div className="logo-comp">
      <img src={imgSoldier} alt="imgSoldier" width={40}/>
      <h1>ShabTsak</h1>
    </div>
  )
}
