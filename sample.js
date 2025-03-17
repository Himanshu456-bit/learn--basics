document.getElementById("previewButton").addEventListener("click", function() {
    //user inputs
    	const name = document.getElementById("name").value;
    	const bio = document.getElementById("bio").value;
    	const skills = document.getElementById("skills").value;
    	const projects = document.getElementById("projects").value;
    	const contact = document.getElementById("contact").value;
	const educ = document.getElementById("educ").value;
    	const selectedTemplate = document.getElementById("template").value;

    //Data storage
    localStorage.setItem("portfolioData", JSON.stringify({
        name,
        bio,
        skills,
        projects,
	educ,
        contact,
        selectedTemplate
    }));

    // get back tot the seleacted template page
    window.location.href = `${selectedTemplate}.html`;
});
