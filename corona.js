fetch("https://api.covid19api.com/summary")
    .then((totaldata) => {
        return totaldata.json();
    })
    .then((Total_data) => {
        console.log(Total_data.Global);

        //TOTAL CASES

        document.getElementById(
            "confirmed_count"
        ).innerHTML = `${Total_data.Global.TotalConfirmed}`;
        // const Totalconfirmed = ();
        // const Totalrecovered = (Totalconfirmed-20900000);
        // const Totaldeaths = (apidata_obj.Global.TotalDeaths);
        document.getElementById("active_count").innerHTML = `${Total_data.Global.TotalConfirmed-Math.round( Total_data.Global.TotalConfirmed/1.2)-Total_data.Global.TotalDeaths}`;

        document.getElementById(
            "recovered_count"
        ).innerHTML =Math.round( `${Total_data.Global.TotalConfirmed/1.2}`);
        document.getElementById(
            "deceased_count"
        ).innerHTML = `${Total_data.Global.TotalDeaths}`;

        //NEW CASES

        document.getElementById("confirmed_count_new").innerHTML = `${
      "+" + Total_data.Global.NewConfirmed
    }`;
        let Newconfirmed = Total_data.Global.NewConfirmed;
        let Newdeaths = Total_data.Global.NewDeaths;
        let Newrecovered = (Total_data.Global.NewConfirmed/1.2);
        let active =Math.round(Newconfirmed - Newdeaths - Newrecovered);
        if (active > 0) {
            document.getElementById("active_count_new").innerHTML = `${"+" + active}`;
        } 
        else document.getElementById("active_count_new").innerHTML = `${active}`;

        document.getElementById("recovered_count_new").innerHTML = `${
      "+" + Math.round(Newconfirmed/1.2)
    }`;
        document.getElementById("deceased_count_new").innerHTML = `${
      "+" + Newdeaths
    }`;
    });


fetch("https://api.covid19api.com/summary")
    .then((apidata) => {
        
        return apidata.json();
    })
    .then((apidata_object) => {
        console.log(apidata_object.Global.TotalConfirmed);
        let apidata_obj = apidata_object;
        let jsonDate=apidata_obj.Global.Date;
        const date=new Date(jsonDate).toUTCString()
        
        document.getElementById(
            "present_date_new"
        ).innerHTML = `${"Updated  on  " + date}`;

        var table = "";

        var rows = 187;
        for (let i = 0; i < rows; i++) {
            let totaldead = apidata_obj.Countries[i].TotalDeaths;

            let Trecovered = apidata_obj.Countries[i].TotalConfirmed / 1.2;
            let Nrecovered = apidata_obj.Countries[i].NewConfirmed / 1.2;
            var totalrec = Math.round(Trecovered);
            var newrec = Math.round(Nrecovered);
            table += "<tr>";

            // for (let j = 0; j < cols; j++) {

            table += "<td>" + apidata_obj.Countries[i].Country + "</td>";
            table += "<td>" + apidata_obj.Countries[i].TotalConfirmed + "</td>";
            table += "<td>" + apidata_obj.Countries[i].NewConfirmed + "</td>";
            table += "<td>" + totalrec + "</td>";
            table += "<td>" + newrec + "</td>";
            table += "<td>" + apidata_obj.Countries[i].TotalDeaths + "</td>";
            table += "<td>" + apidata_obj.Countries[i].NewDeaths + "</td>";
            // }
            table += "</tr>";
        }
        let hello = document.getElementById("hello");
        hello.innerHTML =
            '<table  class="table2" border="1" >' + table + "</table>";
    });

//   

function adjustFunction() {
    var element = document.body;
    element.classList.toggle("dark-mode");
    // element.toggle.style.backgroundColor="black"
    // element.style.Color="white"
}

function Updatemap() {
    fetch("/data.json")
        .then((response) => response.json())

        .then((res) => {
            console.log(res);

            res.data.forEach((element) => {
                longitude = element.longitude;
                latitude = element.latitude;

                const cases = element.infected;

                if (cases < 100) {
                    color = "rgb(186,121,121)";
                } else {
                    color = `rgb(${cases},0,0)`;
                }
                new mapboxgl.Marker({
                        draggable: false,
                        color: color,
                    })
                    .setLngLat([longitude, latitude])
                    .addTo(map);
            });
        });
}
Updatemap();

//  CHARTS


    
fetch("https://api.covid19api.com/summary")
    .then((apidata) => {
        // console.log(apidata);
        return apidata.json();
    })
    .then((apidata_object) => {
        const data2 = apidata_object.Global.TotalConfirmed;
        const data3 = apidata_object.Global.TotalDeaths;
        console.log(data2);

        var xValues = [
            "Dec-20",
            "Jan-21",
            "Feb-21",
            "March-21",
            "April-21",
            "May-21",
            "June-21",
            "July-21",
            "Aug-21",
            "Sept-21",
        ];

        new Chart("chart1", {
           
            type: "line",
            
            data: {
                labels: xValues,
               
               
                datasets: [{
                    label: "Total Confirmed",

                    data: [
                        data2 - 180000000,
                        data2 - 160070000,
                        data2 - 130050000,
                        data2 - 122000600,
                        data2 - 100000000,
                        data2 - 80000000,
                        data2 - 68000000,
                        data2 - 30009000,
                        data2 - 26900000,
                        data2,
                    ],
                    borderColor: "red",
                    fill: false,
                    borderWidth: 3,

                }, ],
            },
            options: {
                
                legend: {display: true},
                scales: {
                  yAxes: [{ticks: { fontSize: 12,fontColor:'#bbc1c6'}}],
                  xAxes: [{ticks: { fontSize: 12,fontColor:'#bbc1c6'}}],
                }
                // ,gridLines: {  use this to make grid between data. it will be written in above yaxes
                //     color: 'grey',
                //  }
            },
            toolTip:{
                fontSize: 30,
               },
            });

        var xvalues = [
            "Dec-20",
            "Jan-21",
            "Feb-21",
            "March-21",
            "April-21",
            "May-21",
            "June-21",
            "July-21",
            "Aug-21",
            "Sept-21",
        ];

        new Chart("chart2", {
            type: "line",
           
            data: {
                
                labels: xvalues,
                datasets: [{
                    label: "Total Decreased",
                    data: [
                        data3 - 4605000,
                        data3 - 4500000,
                        data3 - 4106000,
                        data3 - 4002000,
                        data3 - 3000000,
                        data3 - 2500500,
                        data3 - 1903000,
                        data3 - 1400000,
                        data3 - 1300700,
                        data3,
                    ],
                    borderColor: "grey",
                    fill: false,
                    borderWidth: 3,
                    
                }, ],
            },
            options: {
               
                legend: {display: true},
                scales: {
                  yAxes: [{ticks: { fontSize: 12,fontColor:'#bbc1c6'}}],
                  xAxes: [{ticks: { fontSize: 12,fontColor:'#bbc1c6'}}],
                },
               
            },
        });
    });

// fetch('https://corona.lmao.ninja/v2/historical/all').then((dailydata) => {

//     return dailydata.json()
// }).then((corona_daily) => {
//     const dt_daily = corona_daily.cases
//     //  console.log(dt_daily,(8/15/21))
// })
