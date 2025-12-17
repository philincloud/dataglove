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

    // Create white disk with minimal thickness
    const diskGeometry = new THREE.CylinderGeometry(2, 2, 0.01, 32);
    const diskMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
    circle = new THREE.Mesh(diskGeometry, diskMaterial);
    sceneGroup.add(circle);
    

    // Create red horizontal line across the disk (X-axis) - using BoxGeometry for actual thickness
    const redLineGeometry = new THREE.BoxGeometry(4, 0.5, 0.5);
    const redLineMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    redLine = new THREE.Mesh(redLineGeometry, redLineMaterial);
    sceneGroup.add(redLine);
    

    // Create blue vertical line across the disk (Y-axis) - using BoxGeometry for actual thickness
    const blueLineGeometry = new THREE.BoxGeometry(0.5, 4, 0.5);
    const blueLineMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff });
    blueLine = new THREE.Mesh(blueLineGeometry, blueLineMaterial);
    sceneGroup.add(blueLine);
    

    // Create green Z-axis line perpendicular to the disk - using BoxGeometry for actual thickness
    const greenLineGeometry = new THREE.BoxGeometry(0.5, 0.5, 6);
    const greenLineMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    greenLine = new THREE.Mesh(greenLineGeometry, greenLineMaterial);
    sceneGroup.add(greenLine);
    
    // Create red point in center
    const pointGeometry = new THREE.SphereGeometry(0.15, 16, 16);
    const pointMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    redPoint = new THREE.Mesh(pointGeometry, pointMaterial);
    sceneGroup.add(redPoint);
    
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
