import {Link} from 'react-router' 
console.log(Link)
export default function ContryCard({CoutryDetail}) {
  const {name,flag,population,region,capital}=CoutryDetail;
    return (
      <Link to={`/countryDetail?country=${name}`} className="contry ">
        <img src={flag} alt="" />
        <div className="contry-detail-container">
          <div className="contry-name">{name}</div>
          <div className="contry-detail">
            <div className="population-container contry-data">
              <span className="population contry-data-name">Population:</span>
              <span className="pop-num contry-data-value">{population}</span>
            </div>
            <div className="region-container contry-data">
              <span className="region contry-data-name">Region:</span>
              <span className="region-name contry-data-value">{region}</span>
            </div>
            <div className="capital-container contry-data">
              <span className="capital contry-data-name">Capital:</span>
              <span className="capital-name contry-data-value">{capital}</span>
            </div>
          </div>
        </div>
      </Link>
    );
}
