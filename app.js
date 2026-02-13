// Sample data for neighbors with coordinates (COMPLETE FILE RESET)
const neighborsData = [
    {
        name: 'Sarah Johnson',
        skills: 'Cooking, Gardening',
        interests: 'Community gardening, Potlucks',
        street: 'Maple Street',
        lat: 40.7128,
        lng: -74.0060
    },
    {
        name: 'Michael Chen',
        skills: 'IT Support, Repairs',
        interests: 'Technology, Home improvement',
        street: 'Oak Avenue',
        lat: 40.7282,
        lng: -73.7949
    },
    {
        name: 'Emma Williams',
        skills: 'Tutoring, Writing',
        interests: 'Education, Mentoring',
        street: 'Elm Road',
        lat: 40.7489,
        lng: -73.9680
    },
    {
        name: 'David Brown',
        skills: 'Carpentry, Landscaping',
        interests: 'DIY projects, Outdoor activities',
        street: 'Birch Lane',
        lat: 40.7549,
        lng: -73.9840
    },
    {
        name: 'Lisa Martinez',
        skills: 'Health, Yoga',
        interests: 'Wellness, Community fitness',
        street: 'Pine Street',
        lat: 40.7614,
        lng: -73.9776
    },
    {
        name: 'James Wilson',
        skills: 'Mechanics, Car repair',
        interests: 'Vehicles, Tool sharing',
        street: 'Cedar Drive',
        lat: 40.7505,
        lng: -73.9972
    }
];

// Resources array to store shared resources
let resourcesData = [];

// Events array to store community events
let eventsData = [];

// Google Map instance
let map;
let markers = [];
let infoWindows = [];
let userLocationMarker = null;
let currentFilter = { skill: '', search: '' };

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    loadNeighbors();
    loadResources();
    loadEvents();
});

// Load and display neighbors
function loadNeighbors() {
    const neighborsList = document.getElementById('neighborsList');
    neighborsList.innerHTML = '';
    
    neighborsData.forEach(neighbor => {
        const neighborCard = document.createElement('div');
        neighborCard.className = 'neighbor-card';
        neighborCard.setAttribute('data-neighbor-id', neighbor.name);
        neighborCard.style.cursor = 'pointer';
        neighborCard.innerHTML = `
            <h4>${neighbor.name}</h4>
            <div class="skills"><strong>Skills:</strong> ${neighbor.skills}</div>
            <div class="interests"><strong>Interests:</strong> ${neighbor.interests}</div>
            <div style="font-size: 0.9rem; color: #95a5a6; margin-top: 0.5rem;">📍 ${neighbor.street}</div>
            <button class="btn btn-primary" style="width: 100%; margin-top: 1rem; padding: 8px;" onclick="contactNeighbor('${neighbor.name}')">Contact</button>
        `;
        neighborsList.appendChild(neighborCard);
    });
    
    // Initialize map if Google Maps is loaded
    if (typeof google !== 'undefined' && google.maps) {
        initMap();
    }
}

// Filter neighbors based on search input
function filterNeighbors() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    currentFilter.search = searchInput;
    applyFilters();
}

// Filter by skill
function filterBySkill() {
    const skillFilter = document.getElementById('skillFilter').value;
    currentFilter.skill = skillFilter;
    applyFilters();
}

// Apply all filters
function applyFilters() {
    const neighborsList = document.getElementById('neighborsList');
    neighborsList.innerHTML = '';
    
    let filtered = neighborsData.filter(neighbor => {
        const matchesSkill = !currentFilter.skill || neighbor.skills.includes(currentFilter.skill);
        const matchesSearch = !currentFilter.search || 
            neighbor.name.toLowerCase().includes(currentFilter.search) ||
            neighbor.skills.toLowerCase().includes(currentFilter.search) ||
            neighbor.interests.toLowerCase().includes(currentFilter.search);
        return matchesSkill && matchesSearch;
    });
    
    if (filtered.length === 0) {
        neighborsList.innerHTML = '<p style="text-align: center; padding: 1rem; color: #7f8c8d;">No neighbors match your filters.</p>';
        displayMarkers([]);
        return;
    }
    
    filtered.forEach(neighbor => {
        const neighborCard = document.createElement('div');
        neighborCard.className = 'neighbor-card';
        neighborCard.setAttribute('data-neighbor-id', neighbor.name);
        neighborCard.style.cursor = 'pointer';
        neighborCard.innerHTML = `
            <h4>${neighbor.name}</h4>
            <div class="skills"><strong>Skills:</strong> ${neighbor.skills}</div>
            <div class="interests"><strong>Interests:</strong> ${neighbor.interests}</div>
            <div style="font-size: 0.9rem; color: #95a5a6; margin-top: 0.5rem;">📍 ${neighbor.street}</div>
            <button class="btn btn-primary" style="width: 100%; margin-top: 1rem; padding: 8px;" onclick="contactNeighbor('${neighbor.name}')">Contact</button>
        `;
        neighborsList.appendChild(neighborCard);
    });

    // Update map with filtered neighbors
    if (typeof google !== 'undefined' && google.maps) {
        displayMarkers(filtered);
    }
}

// Add resource
function addResource() {
    const resourceName = document.getElementById('resourceName').value.trim();
    const resourceDesc = document.getElementById('resourceDesc').value.trim();
    const resourceOwner = document.getElementById('resourceOwner').value.trim();
    
    if (!resourceName || !resourceDesc || !resourceOwner) {
        alert('Please fill in all fields');
        return;
    }
    
    const resource = {
        name: resourceName,
        description: resourceDesc,
        owner: resourceOwner,
        date: new Date().toLocaleDateString()
    };
    
    resourcesData.push(resource);
    loadResources();
    
    // Clear inputs
    document.getElementById('resourceName').value = '';
    document.getElementById('resourceDesc').value = '';
    document.getElementById('resourceOwner').value = '';
}

// Load and display resources
function loadResources() {
    const resourcesList = document.getElementById('resourcesList');
    resourcesList.innerHTML = '';
    
    if (resourcesData.length === 0) {
        resourcesList.innerHTML = '<p style="grid-column: 1/-1; text-align: center;">No resources shared yet. Be the first to share!</p>';
        return;
    }
    
    resourcesData.forEach((resource, index) => {
        const resourceCard = document.createElement('div');
        resourceCard.className = 'resource-card';
        resourceCard.innerHTML = `
            <h4>📦 ${resource.name}</h4>
            <p>${resource.description}</p>
            <div class="owner">By ${resource.owner}</div>
            <div style="font-size: 0.85rem; color: #95a5a6; margin-top: 0.5rem;">Added: ${resource.date}</div>
            <button class="btn btn-primary" style="width: 100%; margin-top: 1rem; padding: 8px;" onclick="requestResource(${index})">Request</button>
        `;
        resourcesList.appendChild(resourceCard);
    });
}

// Add event
function addEvent() {
    const eventName = document.getElementById('eventName').value.trim();
    const eventDate = document.getElementById('eventDate').value.trim();
    const eventDesc = document.getElementById('eventDesc').value.trim();
    
    if (!eventName || !eventDate || !eventDesc) {
        alert('Please fill in all fields');
        return;
    }
    
    const event = {
        name: eventName,
        date: eventDate,
        description: eventDesc,
        attendees: 0
    };
    
    eventsData.push(event);
    loadEvents();
    
    // Clear inputs
    document.getElementById('eventName').value = '';
    document.getElementById('eventDate').value = '';
    document.getElementById('eventDesc').value = '';
}

// Load and display events
function loadEvents() {
    const eventsList = document.getElementById('eventsList');
    eventsList.innerHTML = '';
    
    if (eventsData.length === 0) {
        eventsList.innerHTML = '<p style="text-align: center;">No events scheduled yet. Create one to bring the community together!</p>';
        return;
    }
    
    eventsData.forEach((event, index) => {
        const eventCard = document.createElement('div');
        eventCard.className = 'event-card';
        const formattedDate = new Date(event.date).toLocaleDateString('en-US', {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'});
        eventCard.innerHTML = `
            <h4>🎉 ${event.name}</h4>
            <div class="date">📅 ${formattedDate}</div>
            <p>${event.description}</p>
            <div style="margin-top: 1rem; color: #7f8c8d;">👥 ${event.attendees} attending</div>
            <button class="btn btn-primary" style="margin-top: 1rem;" onclick="attendEvent(${index})">Join Event</button>
        `;
        eventsList.appendChild(eventCard);
    });
}

// Contact neighbor
function contactNeighbor(name) {
    alert(`Message sent to ${name}! They'll get back to you soon.`);
}

// Request resource
function requestResource(index) {
    const resource = resourcesData[index];
    alert(`Request sent to ${resource.owner} for: ${resource.name}`);
}

// Attend event
function attendEvent(index) {
    eventsData[index].attendees++;
    loadEvents();
    alert('Great! You\'ve joined the event. See you there!');
}

// Submit contact form
function submitContact(event) {
    event.preventDefault();
    alert('Thank you for your message! We\'ll get back to you soon.');
    event.target.reset();
}

// Smooth scroll to section
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    section.scrollIntoView({ behavior: 'smooth' });
}

// Initialize Google Map
function initMap() {
    // Calculate center point of all neighbors
    let totalLat = 0, totalLng = 0;
    neighborsData.forEach(neighbor => {
        totalLat += neighbor.lat;
        totalLng += neighbor.lng;
    });
    const centerLat = totalLat / neighborsData.length;
    const centerLng = totalLng / neighborsData.length;

    // Create map with enhanced styling
    const mapElement = document.getElementById('map');
    
    if (!mapElement) return;

    map = new google.maps.Map(mapElement, {
        zoom: 13,
        center: { lat: centerLat, lng: centerLng },
        mapTypeId: 'roadmap',
        styles: [
            {
                featureType: 'poi',
                elementType: 'labels',
                stylers: [{ visibility: 'off' }]
            },
            {
                featureType: 'administrative',
                elementType: 'labels.text.stroke',
                stylers: [{ color: '#ffffff' }, { weight: 6 }]
            }
        ],
        zoomControl: true,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: true,
        gestureHandling: 'cooperative'
    });

    // Add custom controls
    const mapTypeSelect = document.getElementById('mapTypeSelector');
    if (mapTypeSelect) {
        map.addListener('maptypeid_changed', function() {
            mapTypeSelect.value = map.getMapTypeId();
        });
    }

    displayMarkers(neighborsData);
}

// Change map type
function changeMapType() {
    const mapType = document.getElementById('mapTypeSelector').value;
    if (map) {
        map.setMapTypeId(mapType);
    }
}

// Geolocate user
function geolocateUser() {
    if (navigator.geolocation) {
        const geolocateBtn = document.getElementById('geolocateBtn');
        geolocateBtn.disabled = true;
        geolocateBtn.textContent = '⏳ Finding location...';

        navigator.geolocation.getCurrentPosition(
            function(position) {
                const userLat = position.coords.latitude;
                const userLng = position.coords.longitude;

                // Remove old user location marker
                if (userLocationMarker) {
                    userLocationMarker.setMap(null);
                }

                // Add user location marker
                userLocationMarker = new google.maps.Marker({
                    position: { lat: userLat, lng: userLng },
                    map: map,
                    title: 'Your Location',
                    icon: {
                        path: google.maps.SymbolPath.CIRCLE,
                        scale: 15,
                        fillColor: '#3498db',
                        fillOpacity: 1,
                        strokeColor: 'white',
                        strokeWeight: 3
                    }
                });

                // Center map on user location
                map.setCenter({ lat: userLat, lng: userLng });
                map.setZoom(14);

                const infoWindow = new google.maps.InfoWindow({
                    content: '<div style="padding: 10px;"><strong>📍 Your Location</strong></div>'
                });
                userLocationMarker.addListener('click', () => {
                    infoWindow.open(map, userLocationMarker);
                });

                geolocateBtn.disabled = false;
                geolocateBtn.textContent = '📍 Find My Location';
            },
            function(error) {
                alert('Unable to get your location. Please enable location services.');
                geolocateBtn.disabled = false;
                geolocateBtn.textContent = '📍 Find My Location';
                console.error('Geolocation error:', error);
            }
        );
    } else {
        alert('Geolocation is not supported by your browser.');
    }
}

// Display markers on map
function displayMarkers(neighbors) {
    if (!map) return;

    // Clear existing markers and info windows
    markers.forEach(marker => marker.setMap(null));
    markers = [];
    infoWindows.forEach(iw => iw.close());
    infoWindows = [];

    const neighborNames = neighbors.map(n => n.name);

    neighbors.forEach((neighbor, index) => {
        const marker = new google.maps.Marker({
            position: { lat: neighbor.lat, lng: neighbor.lng },
            map: map,
            title: neighbor.name,
            label: {
                text: (index + 1).toString(),
                color: 'white',
                fontSize: '14px',
                fontWeight: 'bold'
            },
            icon: {
                path: google.maps.SymbolPath.CIRCLE,
                scale: 12,
                fillColor: '#2ecc71',
                fillOpacity: 1,
                strokeColor: 'white',
                strokeWeight: 2
            }
        });

        const infoContent = `
            <div style="padding: 10px; max-width: 250px;">
                <h3 style="margin: 0 0 8px 0; color: #2c3e50;">${neighbor.name}</h3>
                <p style="margin: 5px 0; font-size: 0.9rem;"><strong>Skills:</strong> ${neighbor.skills}</p>
                <p style="margin: 5px 0; font-size: 0.9rem;"><strong>Interests:</strong> ${neighbor.interests}</p>
                <p style="margin: 5px 0; font-size: 0.9rem;">📍 ${neighbor.street}</p>
                <button style="margin-top: 10px; padding: 6px 12px; background-color: #2ecc71; color: white; border: none; border-radius: 4px; cursor: pointer;" onclick="contactNeighbor('${neighbor.name}')">Contact</button>
            </div>
        `;

        const infoWindow = new google.maps.InfoWindow({
            content: infoContent
        });

        marker.addListener('click', () => {
            // Close all other info windows
            infoWindows.forEach(iw => iw.close());
            infoWindow.open(map, marker);
        });

        markers.push(marker);
        infoWindows.push(infoWindow);
    });

    // Adjust map bounds to show all markers
    if (neighbors.length > 0) {
        const bounds = new google.maps.LatLngBounds();
        markers.forEach(marker => bounds.extend(marker.getPosition()));
        map.fitBounds(bounds);
        
        // Add padding to bounds
        map.setZoom(Math.max(map.getZoom() - 1, 11));
    }
}

console.log('Neighbour Nurturing Index loaded successfully!');