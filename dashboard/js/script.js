var sidebarOpen = false;
var sidebar = document.getElementById("sidebar");

function opensidebar()
{
    if(!sidebarOpen)
    {
        sidebar.classList.add("sidebar-respsonsive");
        sidebarOpen = true;
    }
}
function closesidebar()
{
    if(sidebarOpen)
    {
        sidebar.classList.remove("sidebar-respsonsive");
        sidebarOpen = false;
    }
}
function openDashboard() {
    document.querySelector('.main-container').innerHTML = window.initialDashboardContent;
    document.querySelector('.main-container').style.display = 'flex';
    document.querySelector('.up-view').style.display = 'none';
}
function openUniversityProfile(){
    var universityProfileContent = "<h2>UNIVERSITY PROFILE VIEW</h2><p>Profile View</p>";
    document.querySelector('.up-view').innerHTML = universityProfileContent;
    document.querySelector('.main-container').style.display = 'none';
    document.querySelector('.up-view').style.display = 'flex';
}
document.addEventListener('DOMContentLoaded', function () {
    window.initialDashboardContent = document.querySelector('.main-container').innerHTML;
    document.querySelector('.up-view').innerHTML = "";
    document.querySelector('.up-view').style.display = 'none';
});

