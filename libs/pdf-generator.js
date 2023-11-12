const pdf_generator = ({name, jobs = [], total = 0}) => {
    return `
    <!doctype html>
    <html>
       <head>
          <meta charset="utf-8">
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Jost:ital,wght@0,200;0,300;0,400;0,500;0,700;1,200;1,300&display=swap');

            * {
                font-family: 'Jost', sans-serif;
            }

            h1, h2 {
                font-weight: 300;
                margin: 1rem 0rem;
            }
            
            h3, h4 {
                font-weight: 300;
                margin: 1rem 0rem;
            }
            
            h4 {
                color: #adadad;
            }

            .items {
                display: flex;
                position: relative;
                align-items: center;
                justify-content: space-around;
                flex-direction: row;
                flex-wrap: wrap;
                max-height: 20rem;
                  width: 100%;
                margin: 1rem 0rem;
            }
            
            .items_half {
                display: flex;
                position: relative;
                align-items: center;
                justify-content: space-around;
                  flex-direction: row;
                flex-wrap: wrap;
                max-height: 30rem;
                  width: 50%;
                margin: 1rem 0rem;
            }
            
            .items_small {
                display: flex;
                position: relative;
                align-items: center;
                justify-content: space-around;
                  flex-direction: row;
                flex-wrap: wrap;
                max-height: 10rem;
                  width: 20%;
                margin: 1rem 0rem;
            }
            
            .items:hover {
              cursor: pointer;
            }
            
            .item {
                display: flex;
                position: relative;
                justify-content: space-around;
                align-items: center;
                text-align: center;
                flex-direction: column;
                margin: 10px 0px;
            }
            
            .item_card {
                display: flex;
                position: relative;
                justify-content: center;
                align-items: center;
                text-align: center;
                flex-direction: column;
                flex-wrap: wrap;
                width: min(30%, 10rem);
                height: min(100%, 15rem);
                background-color: #ffffff;
                color: #5D6430;
                border: none;
                border-radius: 0.2rem;
                  box-shadow: 0px 0px 2px 0px #a7a7a7;
                font-size: 1.1rem;
                  font-weight: 400;
                  padding: 1rem 2rem;
                margin: 1rem 0.5rem;
                max-width: 250px;
                font-weight: 700;
                user-select: none;
                cursor: pointer;
            }
            
            .item_card:hover, .item_card_chosen {
                background-color: #5D6430;
                color: #ffffff;
                box-shadow: 0px 0px 3px 0px #000000;
            }
            
            .item_card:active {
                font-size: 1.15rem;
                transition: 0.15s ease-in-out;
            }
          </style>
       </head>
            <body>        
                <h3>ФИО: ${name}</h3>
                    
                <h3>${jobs.length === 0 ? 'Выполненных работ нет' : 'Выполненные работы'}</h3>
                <div class="items_half">
                    ${jobs.map(el => `
                        <div class="item_card">
                            <b>Длительность: ${el.time}</b>
                            <p>${el.date}</p>
                        </div>
                    `)}
                </div>

            </body>
        </html>
    `
}

module.exports = pdf_generator