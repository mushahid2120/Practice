export default function ContryCard() {
    return (
      <a  className="contry " href='#' >
        <img src="https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/1200px-Flag_of_India.svg.png" alt="" />
        <div className="contry-detail-container">
          <div className="contry-name">India</div>
          <div className="contry-detail">
            <div className="population-container contry-data">
              <span className="population contry-data-name">Population:</span>
              <span className="pop-num contry-data-value">1254</span>
            </div>
            <div className="region-container contry-data">
              <span className="region contry-data-name">Region:</span>
              <span className="region-name contry-data-value">Asia</span>
            </div>
            <div className="capital-container contry-data">
              <span className="capital contry-data-name">Capital:</span>
              <span className="capital-name contry-data-value">Delhi</span>
            </div>
          </div>
        </div>
      </a>
    );
}
