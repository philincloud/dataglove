/**
 * Dataglove JavaScript Module
 * A vanilla JavaScript implementation for dataglove functionality
 */

class DataGlove {
    constructor() {
        this.data = {};
        this.connected = false;
        this.eventListeners = {};
    }

    /**
     * Initialize the dataglove
     */
    init() {
        console.log('DataGlove initialized');
        this.emit('initialized');
    }

    /**
     * Connect to data source
     */
    connect() {
        this.connected = true;
        console.log('DataGlove connected');
        this.emit('connected');
    }

    /**
     * Disconnect from data source
     */
    disconnect() {
        this.connected = false;
        console.log('DataGlove disconnected');
        this.emit('disconnected');
    }

    /**
     * Store data
     * @param {string} key - The data key
     * @param {any} value - The data value
     */
    setData(key, value) {
        this.data[key] = value;
        console.log(`Data set: ${key} = ${value}`);
        this.emit('dataChanged', { key, value });
    }

    /**
     * Retrieve data
     * @param {string} key - The data key
     * @returns {any} The data value
     */
    getData(key) {
        const value = this.data[key];
        console.log(`Data retrieved: ${key} = ${value}`);
        return value;
    }

    /**
     * Remove data
     * @param {string} key - The data key to remove
     */
    removeData(key) {
        delete this.data[key];
        console.log(`Data removed: ${key}`);
        this.emit('dataRemoved', { key });
    }

    /**
     * Get all data
     * @returns {object} All stored data
     */
    getAllData() {
        return { ...this.data };
    }

    /**
     * Clear all data
     */
    clearAllData() {
        this.data = {};
        console.log('All data cleared');
        this.emit('dataCleared');
    }

    /**
     * Add event listener
     * @param {string} event - Event name
     * @param {function} callback - Callback function
     */
    on(event, callback) {
        if (!this.eventListeners[event]) {
            this.eventListeners[event] = [];
        }
        this.eventListeners[event].push(callback);
    }

    /**
     * Remove event listener
     * @param {string} event - Event name
     * @param {function} callback - Callback function to remove
     */
    off(event, callback) {
        if (this.eventListeners[event]) {
            this.eventListeners[event] = this.eventListeners[event].filter(
                cb => cb !== callback
            );
        }
    }

    /**
     * Emit event
     * @param {string} event - Event name
     * @param {any} data - Event data
     */
    emit(event, data = null) {
        if (this.eventListeners[event]) {
            this.eventListeners[event].forEach(callback => {
                try {
                    callback(data);
                } catch (error) {
                    console.error(`Error in event callback for ${event}:`, error);
                }
            });
        }
    }

    /**
     * Get connection status
     * @returns {boolean} Connection status
     */
    isConnected() {
        return this.connected;
    }

    /**
     * Get data size
     * @returns {number} Number of stored items
     */
    getDataSize() {
        return Object.keys(this.data).length;
    }

    /**
     * Check if key exists
     * @param {string} key - Data key
     * @returns {boolean} Whether the key exists
     */
    hasData(key) {
        return key in this.data;
    }

    /**
     * Get data keys
     * @returns {string[]} Array of data keys
     */
    getDataKeys() {
        return Object.keys(this.data);
    }

    /**
     * Export data as JSON
     * @returns {string} JSON string of all data
     */
    exportData() {
        return JSON.stringify(this.data, null, 2);
    }

    /**
     * Import data from JSON
     * @param {string} jsonString - JSON string to import
     */
    importData(jsonString) {
        try {
            this.data = JSON.parse(jsonString);
            console.log('Data imported successfully');
            this.emit('dataImported', this.data);
        } catch (error) {
            console.error('Failed to import data:', error);
            throw new Error('Invalid JSON string');
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing DataGlove...');
    
    // Create global instance
    window.dataGlove = new DataGlove();
    window.dataGlove.init();
    
    // Add some demo data for testing
    window.dataGlove.setData('appName', 'DataGlove');
    window.dataGlove.setData('version', '1.0.0');
    window.dataGlove.setData('initialized', new Date().toISOString());
    
    console.log('DataGlove is ready to use!');
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DataGlove;
}
