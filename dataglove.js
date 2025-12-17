// Simple vanilla JavaScript dataglove functionality

function datagloveInit() {
    console.log('DataGlove initialized');
}

function datagloveProcess(data) {
    console.log('Processing data:', data);
    return data;
}




// Global variables for scene objects
let scene, camera, renderer, sceneGroup; // Group to hold all rotatable objects

// Global variables for circle objects
let circle, circle2, circle3, yellowDisk, lightGreenDisk, darkGreenDisk, orangeDisk;



// Global variables for line objects
let redLine, blueLine, greenLine, yellowLine, lightGreenLine, darkGreenLine, orangeLine, darkGreyLine;

// Global variables for upper (rotatable) parts of line objects
let orangeLineUpper, yellowLineUpper, darkGreyLineUpper, lightGreenLineUpper, darkGreenLineUpper;

// Three.js scene setup
function initThreeScene() {
    // Scene setup
    scene = new THREE.Scene();
    renderer = new THREE.WebGLRenderer({ antialias: true });

    renderer.setSize(window.innerWidth * 0.75, window.innerHeight * 0.75);
    renderer.setClearColor(0x2a2a2a); // Dark background for better contrast
    document.getElementById('canvas-container').appendChild(renderer.domElement);
    
    // Calculate correct aspect ratio based on canvas size
    const canvasWidth = window.innerWidth * 0.75;
    const canvasHeight = window.innerHeight * 0.75;
    const aspectRatio = canvasWidth / canvasHeight;
    
    camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 1000);
    
    // Create a group to hold all objects that should rotate together
    sceneGroup = new THREE.Group();
    scene.add(sceneGroup);




    // Create white disk with minimal thickness (X,Y surface)
    const diskGeometry = new THREE.CylinderGeometry(2, 2, 0.01, 32);
    const diskMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
    circle = new THREE.Mesh(diskGeometry, diskMaterial);
    sceneGroup.add(circle);
    


    // Create light grey disk in Y,Z surface (perpendicular to X-axis)
    const disk2Geometry = new THREE.CylinderGeometry(2, 2, 0.01, 32);
    const disk2Material = new THREE.MeshBasicMaterial({ color: 0xcccccc });
    circle2 = new THREE.Mesh(disk2Geometry, disk2Material);
    circle2.rotation.x = Math.PI / 2; // Rotate to align with Y,Z surface
    sceneGroup.add(circle2);
    




    // Create dark grey disk in X,Z surface (perpendicular to Y-axis)
    const disk3Geometry = new THREE.CylinderGeometry(3.6, 3.6, 0.01, 32);
    const disk3Material = new THREE.MeshBasicMaterial({ color: 0x999999 });
    circle3 = new THREE.Mesh(disk3Geometry, disk3Material);
    circle3.rotation.z = Math.PI / 2; // Rotate to align with X,Z surface
    circle3.userData.originalColor = new THREE.Color(0x999999);
    sceneGroup.add(circle3);
    

    // Create vertical line through dark grey disk center (along y-axis)
    // Split into lower (fixed) and upper (rotatable) parts with hinge at y=0
    
    // Lower part: fixed from y=0 to y=-3.6 (half of 7.2)
    const darkGreyLineLowerGeometry = new THREE.CylinderGeometry(0.04, 0.04, 3.6, 16);
    const darkGreyLineMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
    darkGreyLine = new THREE.Mesh(darkGreyLineLowerGeometry, darkGreyLineMaterial);
    darkGreyLine.position.set(0, -1.8, 0); // Position so top touches y=0
    sceneGroup.add(darkGreyLine);
    
    // Upper part: rotatable from y=0 to y=3.6 (half of 7.2)
    const darkGreyLineUpperGeometry = new THREE.CylinderGeometry(0.04, 0.04, 3.6, 16);
    const darkGreyLineUpperMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
    darkGreyLineUpper = new THREE.Mesh(darkGreyLineUpperGeometry, darkGreyLineUpperMaterial);
    darkGreyLineUpper.position.set(0, 1.8, 0); // Position so bottom touches y=0
    sceneGroup.add(darkGreyLineUpper);


    // Create red horizontal line across the disk (X-axis) - using CylinderGeometry for round appearance
    const redLineGeometry = new THREE.CylinderGeometry(0.03, 0.03, 4, 16);
    const redLineMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    redLine = new THREE.Mesh(redLineGeometry, redLineMaterial);
    redLine.rotation.z = Math.PI / 2; // Rotate to align with X-axis
    sceneGroup.add(redLine);
    


    // Create blue vertical line across the disk (Y-axis) - using CylinderGeometry for round appearance
    const blueLineGeometry = new THREE.CylinderGeometry(0.03, 0.03, 4, 16);
    const blueLineMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff });
    blueLine = new THREE.Mesh(blueLineGeometry, blueLineMaterial);
    // No rotation needed - cylinder by default aligns with Y-axis
    sceneGroup.add(blueLine);
    


    // Create green Z-axis line perpendicular to the disk - using CylinderGeometry for round appearance
    const greenLineGeometry = new THREE.CylinderGeometry(0.03, 0.03, 6, 16);
    const greenLineMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    greenLine = new THREE.Mesh(greenLineGeometry, greenLineMaterial);
    greenLine.rotation.x = Math.PI / 2; // Rotate to align with Z-axis
    sceneGroup.add(greenLine);
    

    // Create red point in center
    const pointGeometry = new THREE.SphereGeometry(0.15, 16, 16);
    const pointMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    redPoint = new THREE.Mesh(pointGeometry, pointMaterial);
    sceneGroup.add(redPoint);
    

    // Create 4 red points on the red X-axis line
    const axisPointGeometry = new THREE.SphereGeometry(0.12, 16, 16);
    const axisPointMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    
    // Point at the beginning of the line (x = -2)
    const redPoint1 = new THREE.Mesh(axisPointGeometry, axisPointMaterial);
    redPoint1.position.set(-2, 0, 0);
    sceneGroup.add(redPoint1);
    
    // Point at 1/4 of the line length (x = -1)
    const redPoint2 = new THREE.Mesh(axisPointGeometry, axisPointMaterial);
    redPoint2.position.set(-1, 0, 0);
    sceneGroup.add(redPoint2);
    
    // Point at 3/4 of the line length (x = 1)
    const redPoint3 = new THREE.Mesh(axisPointGeometry, axisPointMaterial);
    redPoint3.position.set(1, 0, 0);
    sceneGroup.add(redPoint3);
    
    // Point at the end of the line (x = 2)
    const redPoint4 = new THREE.Mesh(axisPointGeometry, axisPointMaterial);
    redPoint4.position.set(2, 0, 0);
    sceneGroup.add(redPoint4);
    







    // Create yellow disk centered on the red point at 1/4 of red axis (x = -1)
    // Surface parallel to y/z plane
    const yellowDiskGeometry = new THREE.CylinderGeometry(3, 3, 0.01, 32);
    const yellowDiskMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    yellowDisk = new THREE.Mesh(yellowDiskGeometry, yellowDiskMaterial);
    yellowDisk.position.set(-1, 0, 0); // Center on the 1/4 point of red axis
    yellowDisk.rotation.z = Math.PI / 2; // Rotate to make surface parallel to y/z plane
    yellowDisk.userData.originalColor = new THREE.Color(0xffff00);
    sceneGroup.add(yellowDisk);
    







    // Create vertical line through yellow disk center (along y-axis)
    // Split into lower (fixed) and upper (rotatable) parts with hinge at y=0
    
    // Lower part: fixed from y=0 to y=-3 (half of 6)
    const yellowLineLowerGeometry = new THREE.CylinderGeometry(0.04, 0.04, 3, 16);
    const yellowLineMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
    yellowLine = new THREE.Mesh(yellowLineLowerGeometry, yellowLineMaterial);
    yellowLine.position.set(-1, -1.5, 0); // Position so top touches y=0
    sceneGroup.add(yellowLine);
    
    // Upper part: rotatable from y=0 to y=3 (half of 6)
    const yellowLineUpperGeometry = new THREE.CylinderGeometry(0.04, 0.04, 3, 16);
    const yellowLineUpperMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
    yellowLineUpper = new THREE.Mesh(yellowLineUpperGeometry, yellowLineUpperMaterial);
    yellowLineUpper.position.set(-1, 1.5, 0); // Position so bottom touches y=0
    sceneGroup.add(yellowLineUpper);
    




    // Create light green disk centered on the red point at 3/4 of red axis (x = 1)
    // Surface parallel to y/z plane
    const lightGreenDiskGeometry = new THREE.CylinderGeometry(3, 3, 0.01, 32);
    const lightGreenDiskMaterial = new THREE.MeshBasicMaterial({ color: 0x90ee90 });
    lightGreenDisk = new THREE.Mesh(lightGreenDiskGeometry, lightGreenDiskMaterial);
    lightGreenDisk.position.set(1, 0, 0); // Center on the 3/4 point of red axis
    lightGreenDisk.rotation.z = Math.PI / 2; // Rotate to make surface parallel to y/z plane
    lightGreenDisk.userData.originalColor = new THREE.Color(0x90ee90);
    sceneGroup.add(lightGreenDisk);
    







    // Create vertical line through light green disk center (along y-axis)
    // Split into lower (fixed) and upper (rotatable) parts with hinge at y=0
    
    // Lower part: fixed from y=0 to y=-3 (half of 6)
    const lightGreenLineLowerGeometry = new THREE.CylinderGeometry(0.04, 0.04, 3, 16);
    const lightGreenLineMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
    lightGreenLine = new THREE.Mesh(lightGreenLineLowerGeometry, lightGreenLineMaterial);
    lightGreenLine.position.set(1, -1.5, 0); // Position so top touches y=0
    sceneGroup.add(lightGreenLine);
    
    // Upper part: rotatable from y=0 to y=3 (half of 6)
    const lightGreenLineUpperGeometry = new THREE.CylinderGeometry(0.04, 0.04, 3, 16);
    const lightGreenLineUpperMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
    lightGreenLineUpper = new THREE.Mesh(lightGreenLineUpperGeometry, lightGreenLineUpperMaterial);
    lightGreenLineUpper.position.set(1, 1.5, 0); // Position so bottom touches y=0
    sceneGroup.add(lightGreenLineUpper);
    




    // Create dark green disk at the end of red x-axis line (x = 2)
    // Surface parallel to y/z plane
    const darkGreenDiskGeometry = new THREE.CylinderGeometry(2.1, 2.1, 0.01, 32);
    const darkGreenDiskMaterial = new THREE.MeshBasicMaterial({ color: 0x006400 });
    darkGreenDisk = new THREE.Mesh(darkGreenDiskGeometry, darkGreenDiskMaterial);
    darkGreenDisk.position.set(2, 0, 0); // Center on the end point of red axis
    darkGreenDisk.rotation.z = Math.PI / 2; // Rotate to make surface parallel to y/z plane
    darkGreenDisk.userData.originalColor = new THREE.Color(0x006400);
    sceneGroup.add(darkGreenDisk);
    







    // Create vertical line through dark green disk center (along y-axis)
    // Split into lower (fixed) and upper (rotatable) parts with hinge at y=0
    
    // Lower part: fixed from y=0 to y=-2.1 (half of 4.2)
    const darkGreenLineLowerGeometry = new THREE.CylinderGeometry(0.04, 0.04, 2.1, 16);
    const darkGreenLineMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
    darkGreenLine = new THREE.Mesh(darkGreenLineLowerGeometry, darkGreenLineMaterial);
    darkGreenLine.position.set(2, -1.05, 0); // Position so top touches y=0
    sceneGroup.add(darkGreenLine);
    
    // Upper part: rotatable from y=0 to y=2.1 (half of 4.2)
    const darkGreenLineUpperGeometry = new THREE.CylinderGeometry(0.04, 0.04, 2.1, 16);
    const darkGreenLineUpperMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
    darkGreenLineUpper = new THREE.Mesh(darkGreenLineUpperGeometry, darkGreenLineUpperMaterial);
    darkGreenLineUpper.position.set(2, 1.05, 0); // Position so bottom touches y=0
    sceneGroup.add(darkGreenLineUpper);
    

    




    // Create orange disk at the beginning of red x-axis line (x = -2)
    // Surface parallel to y/z plane, same size as dark green disk (radius 2.1)
    const orangeDiskGeometry = new THREE.CylinderGeometry(2.1, 2.1, 0.01, 32);
    const orangeDiskMaterial = new THREE.MeshBasicMaterial({ color: 0xffa500 });
    orangeDisk = new THREE.Mesh(orangeDiskGeometry, orangeDiskMaterial);
    orangeDisk.position.set(-2, 0, 0); // Center on the beginning point of red axis
    orangeDisk.rotation.z = Math.PI / 2; // Rotate to make surface parallel to y/z plane
    orangeDisk.userData.originalColor = new THREE.Color(0xffa500);
    sceneGroup.add(orangeDisk);
    







    // Create vertical line through orange disk center (along y-axis)
    // Split into lower (fixed) and upper (rotatable) parts with hinge at y=0
    
    // Lower part: fixed from y=0 to y=-2.1 (half of 4.2)
    const orangeLineLowerGeometry = new THREE.CylinderGeometry(0.04, 0.04, 2.1, 16);
    const orangeLineMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
    orangeLine = new THREE.Mesh(orangeLineLowerGeometry, orangeLineMaterial);
    orangeLine.position.set(-2, -1.05, 0); // Position so top touches y=0
    sceneGroup.add(orangeLine);
    
    // Upper part: rotatable from y=0 to y=2.1 (half of 4.2)
    const orangeLineUpperGeometry = new THREE.CylinderGeometry(0.04, 0.04, 2.1, 16);
    const orangeLineUpperMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
    orangeLineUpper = new THREE.Mesh(orangeLineUpperGeometry, orangeLineUpperMaterial);
    orangeLineUpper.position.set(-2, 1.05, 0); // Position so bottom touches y=0
    sceneGroup.add(orangeLineUpper);
    
    // Add lighting for better visibility
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.4);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);
    
    // Camera position
    camera.position.z = 6;
    camera.position.y = 2;
    camera.lookAt(0, 0, 0);
    
    // Render the scene
    renderer.render(scene, camera);
    
    // Setup slider controls
    setupControls();
    
    console.log('Three.js scene initialized');
}



// Function to rotate a black line around X-axis
function rotateLineX(line, degrees) {
    // Convert degrees to radians and rotate around X-axis
    line.rotation.x = THREE.MathUtils.degToRad(degrees);
    
    // Re-render scene
    renderer.render(scene, camera);
}

// Setup slider controls
function setupControls() {
    const xSlider = document.getElementById('x-axis');
    const ySlider = document.getElementById('y-axis');
    const zSlider = document.getElementById('z-axis');
    
    const xValue = xSlider.nextElementSibling;
    const yValue = ySlider.nextElementSibling;
    const zValue = zSlider.nextElementSibling;
    
    // Update rotation when sliders change
    function updateRotation() {
        const pitch = parseFloat(xSlider.value);
        const yaw = parseFloat(ySlider.value);
        const roll = parseFloat(zSlider.value);
        
        // Rotate the entire scene group
        sceneGroup.rotation.set(
            THREE.MathUtils.degToRad(pitch),
            THREE.MathUtils.degToRad(yaw),
            THREE.MathUtils.degToRad(roll)
        );
        
        // Update display values
        xValue.textContent = pitch + '°';
        yValue.textContent = yaw + '°';
        zValue.textContent = roll + '°';
        
        // Re-render scene
        renderer.render(scene, camera);
    }
    
    // Add event listeners to all sliders
    xSlider.addEventListener('input', updateRotation);
    ySlider.addEventListener('input', updateRotation);
    zSlider.addEventListener('input', updateRotation);
    
    // Initialize rotation
    updateRotation();
    

    // Setup color circle rotation controls
    setupColorCircleControls();
    
    // Setup checkbox visibility controls
    setupCheckboxControls();
}



// Setup color circle rotation controls
function setupColorCircleControls() {
    // Get all color sliders
    const colorSliders = document.querySelectorAll('.color-slider');
    


    // Line mapping: slider index → black line object (using upper rotatable parts)
    const lines = [
        orangeLineUpper,      // index 0 - Orange
        yellowLineUpper,      // index 1 - Yellow
        darkGreyLineUpper,    // index 2 - Dark Grey
        lightGreenLineUpper,  // index 3 - Light Green
        darkGreenLineUpper    // index 4 - Dark Green
    ];
    
    // Add event listeners to each color slider
    colorSliders.forEach((slider, index) => {
        const valueDisplay = slider.nextElementSibling;
        
        // Update line rotation when slider changes
        slider.addEventListener('input', function() {
            const degrees = parseFloat(this.value);
            
            // Rotate the corresponding black line
            if (lines[index]) {
                rotateLineX(lines[index], degrees);
            }
            
            // Update display value
            valueDisplay.textContent = degrees + '°';
        });
    });
}



// Setup checkbox visibility controls
function setupCheckboxControls() {
    // Get all checkboxes
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    console.log('Found checkboxes:', checkboxes.length);
    
    // Disk mapping: checkbox index → disk object
    const disks = [
        orangeDisk,      // index 0 - Orange
        yellowDisk,      // index 1 - Yellow
        circle3,         // index 2 - Dark Grey (using circle3 as it's the dark grey disk)
        lightGreenDisk,  // index 3 - Light Green
        darkGreenDisk    // index 4 - Dark Green
    ];
    
    console.log('Available disks:', disks.length);
    console.log('Disk objects:', {
        orangeDisk: orangeDisk,
        yellowDisk: yellowDisk,
        circle3: circle3,
        lightGreenDisk: lightGreenDisk,
        darkGreenDisk: darkGreenDisk
    });
    
    // Add event listeners to each checkbox
    checkboxes.forEach((checkbox, index) => {
        console.log(`Setting up checkbox ${index}:`, checkbox.id);
        
        checkbox.addEventListener('change', function() {
            console.log(`\n=== Checkbox ${index} (${checkbox.id}) changed to: ${this.checked} ===`);
            
            // Toggle disk visibility based on checkbox state
            if (disks[index]) {
                console.log(`Toggling disk ${index}:`, disks[index]);
                console.log(`Disk position:`, disks[index].position);
                console.log(`Disk material type:`, disks[index].material.constructor.name);
                toggleDiskVisibility(disks[index], this.checked);
            } else {
                console.log(`No disk found for index ${index}`);
            }
        });
        
        // Set default state (checked)
        checkbox.checked = true;
    });
}

// Function to toggle disk visibility
function toggleDiskVisibility(disk, isVisible) {
    console.log(`Toggling disk visibility - Visible: ${isVisible}`);
    console.log(`Disk object:`, disk);
    
    if (isVisible) {
        // Make disk opaque and visible
        disk.material.transparent = false;
        disk.material.opacity = 1.0;
        disk.visible = true;
        console.log(`Disk made visible - opacity: ${disk.material.opacity}, transparent: ${disk.material.transparent}`);
    } else {
        // Make disk transparent
        disk.material.transparent = true;
        disk.material.opacity = 0.0;
        disk.visible = false;
        console.log(`Disk made invisible - opacity: ${disk.material.opacity}, transparent: ${disk.material.transparent}`);
    }
    
    // Force material update
    disk.material.needsUpdate = true;
    
    // Re-render scene
    renderer.render(scene, camera);
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    datagloveInit();
    initThreeScene();
});
