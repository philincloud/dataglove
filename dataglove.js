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
    const circle2 = new THREE.Mesh(disk2Geometry, disk2Material);
    circle2.rotation.x = Math.PI / 2; // Rotate to align with Y,Z surface
    sceneGroup.add(circle2);
    


    // Create dark grey disk in X,Z surface (perpendicular to Y-axis)
    const disk3Geometry = new THREE.CylinderGeometry(3.6, 3.6, 0.01, 32);
    const disk3Material = new THREE.MeshBasicMaterial({ color: 0x999999 });
    const circle3 = new THREE.Mesh(disk3Geometry, disk3Material);
    circle3.rotation.z = Math.PI / 2; // Rotate to align with X,Z surface
    sceneGroup.add(circle3);

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
    const yellowDiskGeometry = new THREE.CylinderGeometry(3, 3, 0.02, 32);
    const yellowDiskMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    const yellowDisk = new THREE.Mesh(yellowDiskGeometry, yellowDiskMaterial);
    yellowDisk.position.set(-1, 0, 0); // Center on the 1/4 point of red axis
    yellowDisk.rotation.z = Math.PI / 2; // Rotate to make surface parallel to y/z plane
    sceneGroup.add(yellowDisk);
    
    // Create vertical line through yellow disk center (along y-axis)
    const yellowLineGeometry = new THREE.CylinderGeometry(0.02, 0.02, 6, 16);
    const yellowLineMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
    const yellowLine = new THREE.Mesh(yellowLineGeometry, yellowLineMaterial);
    yellowLine.position.set(-1, 0, 0); // Center on yellow disk
    sceneGroup.add(yellowLine);
    

    // Create light green disk centered on the red point at 3/4 of red axis (x = 1)
    // Surface parallel to y/z plane
    const lightGreenDiskGeometry = new THREE.CylinderGeometry(3, 3, 0.02, 32);
    const lightGreenDiskMaterial = new THREE.MeshBasicMaterial({ color: 0x90ee90 });
    const lightGreenDisk = new THREE.Mesh(lightGreenDiskGeometry, lightGreenDiskMaterial);
    lightGreenDisk.position.set(1, 0, 0); // Center on the 3/4 point of red axis
    lightGreenDisk.rotation.z = Math.PI / 2; // Rotate to make surface parallel to y/z plane
    sceneGroup.add(lightGreenDisk);
    
    // Create vertical line through light green disk center (along y-axis)
    const lightGreenLineGeometry = new THREE.CylinderGeometry(0.02, 0.02, 6, 16);
    const lightGreenLineMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
    const lightGreenLine = new THREE.Mesh(lightGreenLineGeometry, lightGreenLineMaterial);
    lightGreenLine.position.set(1, 0, 0); // Center on light green disk
    sceneGroup.add(lightGreenLine);
    

    // Create dark green disk at the end of red x-axis line (x = 2)
    // Surface parallel to y/z plane
    const darkGreenDiskGeometry = new THREE.CylinderGeometry(2.1, 2.1, 0.02, 32);
    const darkGreenDiskMaterial = new THREE.MeshBasicMaterial({ color: 0x006400 });
    const darkGreenDisk = new THREE.Mesh(darkGreenDiskGeometry, darkGreenDiskMaterial);
    darkGreenDisk.position.set(2, 0, 0); // Center on the end point of red axis
    darkGreenDisk.rotation.z = Math.PI / 2; // Rotate to make surface parallel to y/z plane
    sceneGroup.add(darkGreenDisk);
    
    // Create vertical line through dark green disk center (along y-axis)
    const darkGreenLineGeometry = new THREE.CylinderGeometry(0.02, 0.02, 4.2, 16);
    const darkGreenLineMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
    const darkGreenLine = new THREE.Mesh(darkGreenLineGeometry, darkGreenLineMaterial);
    darkGreenLine.position.set(2, 0, 0); // Center on dark green disk
    sceneGroup.add(darkGreenLine);
    


















    // Create orange disk at the beginning of red x-axis line (x = -2)
    // Surface parallel to y/z plane, same size as dark green disk (radius 2.1)
    const orangeDiskGeometry = new THREE.CylinderGeometry(2.1, 2.1, 0.02, 32);
    const orangeDiskMaterial = new THREE.MeshBasicMaterial({ color: 0xffa500 });
    const orangeDisk = new THREE.Mesh(orangeDiskGeometry, orangeDiskMaterial);
    orangeDisk.position.set(-2, 0, 0); // Center on the beginning point of red axis
    orangeDisk.rotation.z = Math.PI / 2; // Rotate to make surface parallel to y/z plane
    sceneGroup.add(orangeDisk);
    
    // Create vertical line through orange disk center (along y-axis)
    const orangeLineGeometry = new THREE.CylinderGeometry(0.02, 0.02, 4.2, 16);
    const orangeLineMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
    const orangeLine = new THREE.Mesh(orangeLineGeometry, orangeLineMaterial);
    orangeLine.position.set(-2, 0, 0); // Center on orange disk
    sceneGroup.add(orangeLine);
    
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
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    datagloveInit();
    initThreeScene();
});
