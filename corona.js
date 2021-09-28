fetch("https://corona.lmao.ninja/v2/all?yesterday")
    .then((totaldata) => {
        return totaldata.json();
    })
    .then((Total_data) => {
        console.log(Total_data.cases);

        //TOTAL CASES

        document.getElementById(
            "confirmed_count"
        ).innerHTML = `${Total_data.cases}`;
        // const Totalconfirmed = ();
        // const Totalrecovered = (Totalconfirmed-20900000);
        // const Totaldeaths = (apidata_obj.Global.TotalDeaths);
        document.getElementById("active_count").innerHTML = `${Total_data.active}`;

        document.getElementById(
            "recovered_count"
        ).innerHTML = `${Total_data.recovered}`;
        document.getElementById(
            "deceased_count"
        ).innerHTML = `${Total_data.deaths}`;

        //NEW CASES

        document.getElementById("confirmed_count_new").innerHTML = `${
      "+" + Total_data.todayCases
    }`;
        const Newconfirmed = Total_data.todayCases;
        const Newdeaths = Total_data.todayDeaths;
        let Newrecovered = Total_data.todayRecovered;
        const active = Newconfirmed - Newdeaths - Newrecovered;
        if (active > 0) {
            document.getElementById("active_count_new").innerHTML = `${"+" + active}`;
        } else document.getElementById("active_count_new").innerHTML = `${active}`;

        document.getElementById("recovered_count_new").innerHTML = `${
      "+" + Total_data.todayRecovered
    }`;
        document.getElementById("deceased_count_new").innerHTML = `${
      "+" + Total_data.todayDeaths
    }`;
    });

// console.log("hii");
fetch("https://api.covid19api.com/summary")
    .then((apidata) => {
        // console.log(apidata);
        return apidata.json();
    })
    .then((apidata_object) => {
        console.log(apidata_object.Global.TotalConfirmed);
        const apidata_obj = apidata_object;
        document.getElementById(
            "present_date_new"
        ).innerHTML = `${apidata_obj.Global.Date}`;

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

//    const searchfun= ()=>{
//        let filter = document.getElementByTagName('myinput').value.toUpperCase();

//     //    let mytable =document.getElementsByTagName('table');
//         // let tbody = document.getElementsByTagName('tbody');
//        let tr = document.getElementsByTagName('tr')

//        for (var i = 0; i < tr.length; i++) {
//            let td =tr[i].getElementsByTagName('td')[0];

//            if(td){
//                let textvalue =td.textContent || td.innerHTML;

//                if (textvalue.toUpperCase().indexOf(filter) > -1 ) {
//                    tr[i].style.display ="";
//                }
//                else{
//                    tr[i].style.display ="none";
//                }
//            }
//        }
//    }

// var mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
// window.onscroll = function() {scrollFunction()};

// function scrollFunction() {
//   if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
//     mybutton.style.display = "block";
//   } else {
//     mybutton.style.display = "none";
//   }
// }

// When the user clicks on the button, scroll to the top of the document
// function topFunction() {
//   document.body.scrollTop = 0;
//   document.documentElement.scrollTop = 0;
// }

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

        new Chart("myChart", {
           
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
                    borderWidth: 5,

                }, ],
            },
            options: {
                
                legend: {display: true},
                scales: {
                  yAxes: [{ticks: { fontSize: 20}}],
                  xAxes: [{ticks: { fontSize: 20}}],
                }
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

        new Chart("mychart", {
            type: "line",
           
            data: {
                
                labels: xvalues,
                datasets: [{
                    label: "Total Decreased",
                    data: [
                        data3 - 2400000,
                        data3 - 2100000,
                        data3 - 1900000,
                        data3 - 1800000,
                        data3 - 1500000,
                        data3 - 1200000,
                        data3 - 900000,
                        data3 - 600000,
                        data3 - 300000,
                        data3,
                    ],
                    borderColor: "grey",
                    fill: false,
                    borderWidth: 5,
                    
                }, ],
            },
            options: {
               
                legend: {display: true},
                scales: {
                  yAxes: [{ticks: { fontSize: 20}}],
                  xAxes: [{ticks: { fontSize: 20}}],
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