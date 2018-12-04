
var courseArray={
"cloudmanagement" : {
    courseId: "IST 615",
    professorName: "Radhika Garg",
    timing: "9:30 AM",
    day: "Wednesday"
},
"blockchainmanagement" : {
    courseId: "IST 600",
    professorName: "Lee McKnight",
    timing: "2:15 PM",
    day: "Monday"

}}



var getCourseInfo = (courseName) => {
console.log("courseName is", courseName);
courseName = courseName.replace(/\s/g,'').toLowerCase();
console.log("courseName is", courseName);
console.log("courseName is", courseArray);
return courseArray[courseName];

};


module.exports = getCourseInfo;