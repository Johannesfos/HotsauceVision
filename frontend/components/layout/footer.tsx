export const Footer = () => {
  return (
    <>
      <div className="footerstyle">
        <div className="parentbox">
          <div className="childbox">
            <h1>Contact us</h1>
            <p>post@hotsaucevision.com</p>
          </div>
        </div>
        <div className="parentbox">
          <div className="childbox">
            <h1>Social Media</h1>
            <a
              href="https://www.instagram.com/hotsaucevision/?hl=nba"
              target="_blank"
            >
              <img src="insta.svg" alt="insta" className="soslogostyle" />
            </a>
            <a
              href="https://www.facebook.com/Hot-Sauce-Vision-2346656055382250/"
              target="_blank"
            >
              <img src="facebook.svg" alt="facebook" className="soslogostyle" />
            </a>
          </div>
        </div>
        <div className="parentbox">
          <div className="childbox">
            <p>© Hotsauce Vision</p>
            <img src="logo_simple.svg" alt="logo" className="logostyle" />
          </div>
        </div>
      </div>
      <style jsx>{`
        .footerstyle {
          background: rgb(5, 27, 40);
          margin-top: 100px;
          width: 100vw;
          position: relative;
        }

        .parentbox {
          display: flex;
          flex-wrap: wrap;
          flex-direction: column;
          margin: 0px;
          height: 200px;
          width: 100vw;
          justify-content: space-evenly;
          color: white;
          overflow: hidden;
        }
        .childbox {
          margin: auto;
          text-align: center;
        }
        .logostyle {
          width: 5%;
          min-width: 40px;
        }
        .soslogostyle {
          width: 4vw;
          min-width: 50px;
        }
        h1 {
          font-size: calc(2px + 2vmin);
        }
      `}</style>
    </>
  )
}
