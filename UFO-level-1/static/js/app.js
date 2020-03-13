// from data.js
var tableData = data;


var dates = tableData.map(function(date) {
  return date.datetime;
});
  

const uniqueDates = [...new Set(dates)]

var tbody = d3.select("tbody");


var columns = ["datetime","city","state","country","shape","durationMinutes","comments"];

function addTable(){
    tableData.forEach(aliens =>{
		var row = tbody.append("tr");
		columns.forEach(column => {
			if(column =="city" || column =="state" ||column == "country"){
                row.append("td").text(aliens[column].toUpperCase());
              }
			else row.append("td").text(aliens[column]);    
        })
    })
}

addTable();


var inputDate = d3.select("#datetime");

// Select the tag specific to the filter button on the html (class "filter-btn")
var filterButton = d3.select("#filter-btn");

// Select the tag specific to the reset the table button on the html (class "f#reset-btn")
var resetButton = d3.select("#reset-btn");

// Setting a function for filtering the data with the entered datetime value
function filterData(){

    // Prevent the webpage from refreshing
    d3.event.preventDefault();

    // Extract the value from the variable inputDate
    var Datevalue = inputDate.property("value");

    // Filter the data and assign it to a variable
    var filteredData = tableData.filter(function(date){
       return ((date.datetime === Datevalue ||Datevalue == "" )
            )
    })

    // Checking that the data has been filtered as expected
    console.log(filteredData);
	
    // Delete values of the original table containing all values 
    tbody.text("");
	
    // Update the table with the filtered data     
    filteredData.forEach(aliens =>{
        var row = tbody.append("tr");
        columns.forEach(column => {
            if(column =="city" || column =="state" ||column == "country"){
                row.append("td").text(aliens[column].toUpperCase())
              }
              else row.append("td").text(aliens[column]);   
        })
    })
}
// Add event handler for the click button to filter the table with the given input
filterButton.on("click",filterData);

// create a function for resetting the table 
function resetData(){
    tbody.text("");
    addTable();
    }
    
// Add event handler for the reset button to reset the table to original data 
resetButton.on("click",resetData);
