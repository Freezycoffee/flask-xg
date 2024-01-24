function addCircle(e) {
    // const cx = event.clientX-5;
    // const cy = event.clientY-5; 
    const cx = e.pageX-5 ;
    const cy = e.pageY-5 ;        
    var circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", `${cx}`); // Set the x-coordinate
    circle.setAttribute("cy", `${cy}`); // Set the y-coordinate
    circle.setAttribute("r", "5");  // Set the radius
    circle.setAttribute("fill", "navy"); // Set the fill color
    circle.setAttribute("class", "shot"); 

    // Get the x and y coordinates
    let xCoordinate = (circle.getAttribute("cx")/4.8)+0.21;
    let yCoordinate = (circle.getAttribute("cy")/4.7)-0.12;
    // Append the circle to the SVG
    document.getElementById("pitch-img").appendChild(circle);

    // Update the text element with the coordinates
    document.getElementById("coordinate-text").textContent = "Shot Coordinates: x = " + yCoordinate.toFixed(2) + ", y = " + xCoordinate.toFixed(2);
    const distance_l = Math.sqrt((xCoordinate-36)**2+yCoordinate**2);
    const distance_r = Math.sqrt((xCoordinate-44)**2+yCoordinate**2);
    const radian = Math.acos((distance_l**2+distance_r**2-64)/(2*(distance_l*distance_r)));
    const angle = radian*180/Math.PI;

    let p = document.getElementById('player');
    let t = document.getElementById('technique');
    let s = document.getElementById('situation');
    let b = document.getElementById('body-part');
    let o = document.getElementById('on-target');
    let pt = document.getElementById('pass');
    const player_pos = p.value;
    const shot_technique = t.value;
    const pitw = parseInt(document.getElementById('player_in_the_way').value);
    const situation = s.value;
    const pass_type = pt.value;
    const body_part = b.value;
    const on_target = parseInt(o.value);
    let ipb = 0;
    if (yCoordinate<=20.1 && xCoordinate>18 && xCoordinate<62){ipb=1};
    let i6b = 0;
    if (yCoordinate<=6 && xCoordinate>30 && xCoordinate<50){i6b=1};
    let bc = 0;
    if (pitw<=1&&ipb==1){bc=1};
    const table = document.getElementById('table');
    const a = document.createElement('tr');
    table.appendChild(a);

    let vobj = {
    'player_pos':player_pos,
    'distance_to_l':distance_l,
    'distance_to_r':distance_r,
    'angle':angle,
    'shot_technique':shot_technique,
    'player_in_the_way':pitw,
    'situation':situation,
    'pass_type':pass_type,
    'inside_pen_box':ipb,
    'inside_6_box':i6b,
    'body_part':body_part,
    'big_chances':bc,
    'on_target':on_target
    }
    let jsonData = JSON.stringify(vobj);
    // var send = {method:'POST',body:jsonData};
    // fetch("/data",send);
    let out = document.getElementById('xG')
    $.ajax({
      type : "POST",
      url : "/data",
      data : jsonData,
      contentType : "application/json",
      success: function(response) {
        let result = JSON.parse(response);
        out.innerHTML ="<strong>Expected Goals: "+result['data'].toPrecision(2)+"</strong>";
        a.innerHTML= "<td>"+player_pos+"</td><td>"+distance_l.toFixed(2)+"</td><td>"+distance_r.toFixed(2)+"</td><td>"+angle.toFixed(2)+"</td><td>"+shot_technique+"</td><td>"+pitw+"</td><td>"+situation+"</td><td>"+pass_type+"</td><td>"+ipb+"</td><td>"+i6b+"</td><td>"+body_part+"</td><td>"+bc+"</td><td>"+on_target+"</td><td>"+result['data'].toPrecision(2)+"</td>";}, 
      error: function(error) { 
        console.log(error);}
    })


}
var pitch = document.getElementById('pitch-img')
pitch.addEventListener('click',addCircle)

function resetSvg() {
    // Remove all child elements of the SVG
    var svg = document.getElementById("pitch-img");
    var table = document.getElementById("table");
    while (svg.firstChild) {
        svg.removeChild(svg.firstChild);
    }
    

    // Pitch
    var rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect.setAttribute("class", "pitch-svg");
    rect.setAttribute("width", "390");
    rect.setAttribute("height", "280");
    rect.setAttribute("x", "5");
    rect.setAttribute("y", "5");
    document.getElementById("pitch-img").appendChild(rect);
    // Penalty Area
    
    var circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("class", "pitch-svg");
    circle.setAttribute("r", "50");
    circle.setAttribute("cx", "190");
    circle.setAttribute("cy", "79.4");
    document.getElementById("pitch-img").appendChild(circle); 

    var rect1 = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect1.setAttribute("class", "pitch-svg");
    rect1.setAttribute("width", "219");
    rect1.setAttribute("height", "92.5");
    rect1.setAttribute("x", "85");
    rect1.setAttribute("y", "5");
    document.getElementById("pitch-img").appendChild(rect1); 
    
    var rect2 = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect2.setAttribute("class", "pitch-svg");
    rect2.setAttribute("width", "100");
    rect2.setAttribute("height", "22.5");
    rect2.setAttribute("x", "140");
    rect2.setAttribute("y", "5");
    document.getElementById("pitch-img").appendChild(rect2); 

    var circle1 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle1.setAttribute("class", "pitch-svg");
    circle1.setAttribute("r", "2");
    circle1.setAttribute("cx", "190");
    circle1.setAttribute("cy", "54");
    document.getElementById("pitch-img").appendChild(circle1);
    
    // Center Circle
    var circle2 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle2.setAttribute("class", "pitch-svg");
    circle2.setAttribute("r", "50");
    circle2.setAttribute("cx", "190");
    circle2.setAttribute("cy", "285");
    circle2.setAttribute("style", "fill-opacity:0");
    document.getElementById("pitch-img").appendChild(circle2); 

    var circle3 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle3.setAttribute("class", "pitch-svg");
    circle3.setAttribute("r", "2");
    circle3.setAttribute("cx", "190");
    circle3.setAttribute("cy", "285");
    circle3.setAttribute("style", "fill-opacity:0");
    document.getElementById("pitch-img").appendChild(circle3); 

    // Goal
    var rect3 = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect3.setAttribute("class", "pitch-svg");
    rect3.setAttribute("width", "45");
    rect3.setAttribute("height", "5");
    rect3.setAttribute("x", "167.5");
    rect3.setAttribute("y", "0");
    rect3.setAttribute("style","fill:lightgray;fill-opacity:0.5");
    document.getElementById("pitch-img").appendChild(rect3); 

    // Reset the text element
    document.getElementById("coordinate-text").textContent = "";
    document.getElementById("xG").textContent ="";

    while(table.firstChild){table.removeChild(table.firstChild);};
    c = document.createElement("tr");
    c.innerHTML="<th>player_pos</th><th>distance_to_l</th><th>distance_to_r</th><th>angle</th><th>shot_technique</th><th>player_in_the_way</th><th>pass_type</th><th>situation</th><th>inside_pen_box</th><th>inside_6_box</th><th>body_part</th><th>big_chances</th><th>on_target</th><th>xG</th>";
    table.appendChild(c);}

    function exportTableToCSV(filename) {
        var csv = [];
        var rows = document.querySelectorAll("table tr");
      
        for (var i = 0; i < rows.length; i++) {
          var row = [],
            cols = rows[i].querySelectorAll("td, th");
      
          for (var j = 0; j < cols.length; j++)
            row.push(cols[j].innerText);
      
          csv.push(row.join(","));
        }
      
        // Download CSV file
        downloadCSV(csv.join("\n"), filename);
      }
      
      function downloadCSV(csv, filename) {
        var csvFile;
        var downloadLink;
      
        // CSV file
        csvFile = new Blob([csv], {
          type: "text/csv"
        });
      
        // Download link
        downloadLink = document.createElement("a");
      
        // File name
        downloadLink.download = filename;
      
        // Create a link to the file
        downloadLink.href = window.URL.createObjectURL(csvFile);
      
        // Hide download link
        downloadLink.style.display = "none";
      
        // Add the link to DOM
        document.body.appendChild(downloadLink);
      
        // Click download link
        downloadLink.click();
      }