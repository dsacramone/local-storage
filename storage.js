'use strict';
// ASHELY DO YOU SEE THIS HOMIE... IS THIS GOOD?
function Storage(name, type) {
  this.storageType = type || 'sessionStorage';
  this.storageEnabled = false;
  this.defaultValue = {};
  this.storageName = name || '';
  this.keyIsValid = false;

  this.initialize();
}

Storage.prototype = {
    constructor: Storage,

    initialize: function(){
      this.storageEnabled = this.storageAvailable();
      this.keyIsValid = this.hasKeyInStorageDB();

      if(this.storageEnabled && !this.keyIsValid){
        window[this.storageType].setItem(this.storageName, JSON.stringify({}))
      }
    },

    storageAvailable: function () {
      if (this.storageType in window) {
        try {
          window[this.storageType].setItem('storagetemp', 'storagetemp');
          window[this.storageType].removeItem('storagetemp');
          return true;
        } catch (err) {
          // Exception iOS5 private mode
          // some browsers throw error when touching localStorage & cookies are disabled
          return false;
        }
      }
      return false;
    },

    setStorageValue: function (groups) {
      if (this.keyIsValid && ({}).toString.call(groups) === '[object Array]') {
        var db = this.getStorageDB();
        groups.forEach(function (group) {
          for (var key in group) {
            db[key] = group[key];
          }
        })
        window[this.storageType].setItem(this.storageName, JSON.stringify(db));
      }
    },

    getStorageValue: function () {
      if (this.keyIsValid) {
        var storageVals = {},
            dB = this.getStorageDB();
        this.requestedKeys.apply([], arguments).filter(function(key){
              return key in dB;
        }).forEach(function(key) {
              storageVals[key] = dB[key];
        });
        return Object.keys(storageVals).length === 1 
                ? storageVals[Object.keys(storageVals).join()] 
                : storageVals;
      }
        return this.defaultValue;
    },

    hasKeyInStorageDB: function () {
      if (!this.storageAvailable || !(this.storageName in window[this.storageType])) {
        return false;
      }
        return true;
    },

    getStorageDB: function () {
      if (this.keyIsValid) {
        return JSON.parse(window[this.storageType].getItem(this.storageName));
      }
        return this.defaultValue;
    },

    removeStorageValue: function () {
      if (this.keyIsValid) {
        var dB = this.getStorageDB();
        
        this.requestedKeys.apply([], arguments).forEach(function(key){
          delete dB[key];
        })
        window[this.storageType].setItem(this.storageName, JSON.stringify(dB));
      }
      return this.getStorageDB();
    },

    getStorageLength: function() {
      return Object.keys(this.getStorageDB()).length;
    },

    clearStorageDB: function() {
      window[this.storageType].setItem(this.storageName, '');
    },

    deleteStorageDB: function() {
      window[this.storageType].removeItem(this.storageName);
    },

    requestedKeys: function() {
        return [].concat([], [].slice.apply(arguments));
    }
};

module.exports = Storage;
