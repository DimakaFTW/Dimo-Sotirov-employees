function ProjectData(empID,projectID, dateFrom, dateTo){
    this.empID = empID;
    this.projectID =  projectID;
    this.dateFrom = dateFrom;
    this.dateTo = dateTo;
}

//Convert str'2010-03-19' into Date(2010,03,19)
function stringToDate(str){
    if(str === 'NULL'){
        return new Date();
    }else{
        const arrDate = str.split('-');
        return new Date(arrDate[0],arrDate[1],arrDate[2]);
    }
}

function calcPartnershipTime(arr){
    var undentCount = 0;
    //Sort the Arr of Objects by projectID
    var sortByProjectID = arr.sort((a,b)=> a.projectID-b.projectID);
    sortByProjectID.forEach(item=>{
        if(item===undefined){
            undentCount++;
        }
    });
    //Remove all undentified items
    for(var i = 0; i <= undentCount;i++){
        sortByProjectID.pop();
    }
    
    var empOneID =0;
    var projectOneID = 0;
    var empTwoID = 0;
    var projectTwoID =0;
    var projectIdHolder =0;
    var timeTogether =0;
    var dateHolderOne =0;
    var dateHolderTwo =0;
    //Loop thrue sortByProjectID
    for(var i = 0; i<sortByProjectID.length;i++){

        if(sortByProjectID[i]!== undefined){
            projectIdHolder = sortByProjectID[i].projectID;
            var xcopy =i;
            //Looping thrue element i+1 untill sortByProjectID[x].projectID !== projectIdHolder or theres no sortByProjectID[x]
            for(var x = i+1 ; sortByProjectID[x] ? sortByProjectID[x].projectID===projectIdHolder:1<0;x++){

                if(sortByProjectID[x]!==undefined){
                    
                    //store acurate dateFrom to dateHolderOne
                    sortByProjectID[i].dateFrom.getTime()>=sortByProjectID[x].dateFrom.getTime() ? dateHolderOne=sortByProjectID[i].dateFrom: dateHolderOne=sortByProjectID[x].dateFrom;

                    //store acurate dateTo to dateHolderTwo
                    sortByProjectID[i].dateTo.getTime()>=sortByProjectID[x].dateTo.getTime() ? dateHolderTwo=sortByProjectID[x].dateTo: dateHolderTwo=sortByProjectID[i].dateTo;

                    //check if dates matches in time
                    if(dateHolderOne<dateHolderTwo){
                    
                        var difference = Math.abs(dateHolderOne.getTime()-dateHolderTwo.getTime());
                        
                        //check if time diffecente is greater than acomulated timTogether
                        if(timeTogether<difference){
                            timeTogether = difference;

                            empOneID = sortByProjectID[i].empID;
                            empTwoID = sortByProjectID[x].empID;
                            projectOneID = sortByProjectID[i].projectID;
                            projectTwoID = sortByProjectID[x].projectID;
                        }
                    }
                }
                //need x value to set i to
                xcopy = x;

                //break if x in last item of arr
                if(x===sortByProjectID.length-1){
                    break;
                }
            }

            //check i is in the sortByProjectID.length-2 and projectOneID,projectOneID is the same as projectIdHolder
            if((i===sortByProjectID.length-2)&&(projectOneID===projectIdHolder)&&(projectTwoID===projectIdHolder)){
                console.log('In project N:',projectIdHolder+', employees with ID:',empOneID,',',empTwoID+', wokred together the most!');
                break;
            }else if(sortByProjectID[i+2]){
                //checks when further sequence of projectID occures and set i to begin from there
                if((sortByProjectID[i+2].projectID!==projectIdHolder)&&(projectOneID===projectIdHolder)&&(projectTwoID===projectIdHolder)){
                    i=xcopy;
                    timeTogether =0;
                    console.log('In project N:',projectIdHolder+', employees with ID:',empOneID,',',empTwoID+', wokred together the most!');
                } 
            }
            
        }
    }
}



const input = document.querySelector('input');

//Event listener
input.addEventListener('change', function(item){
    const reader = new FileReader();
    reader.readAsText(input.files[0]);
    reader.onload = function(){
        const lines = reader.result.split('\n').map( item => item.split(', '));
        const arrObject = lines.map((item,index)=>{
            if(item.length===4){
                return new ProjectData(item[0],item[1],stringToDate(item[2]),stringToDate(item[3]));
            } else {
                return undefined;
            }
        });
        calcPartnershipTime(arrObject);
    };
},false);
