import EventEmitter from '../common/event-emitter';

import config from '../config.json';

export class IndexedDBService {
    indexedDB;
    open;
    db;
    constructor() {
        this.indexedDB = window.indexedDB;
        this.InitializeDB();
    }

    InitializeDB() {
        this.open = this.indexedDB.open(config.dataBase, config.versionDB);

        this.open.onupgradeneeded = () => {
            this.db = this.open.result;
            this.db.createObjectStore(config.itemsStore, { keyPath: "Id" });
            this.db.createObjectStore(config.gameStateStore, { keyPath: "Id" });
            this.db.createObjectStore(config.gameStaticsStore, { keyPath: "Id" });
            this.db.createObjectStore(config.gameSettingsStore, { keyPath: "Id" });
        };

        this.open.onsuccess = () => {
            this.db = this.open.result;
            EventEmitter.emit('initialized', { name: "ready" });
        }
    }

    Get(id, callback) {     

        let transaction = this.db.transaction(config.itemsStore, "readwrite");
        let itemStore = transaction.objectStore(config.itemsStore);

        let request = itemStore.get(id);
        request.onsuccess = function (event) {
            callback(request.result);
        }
    }

    GetAll(callback) {

        let transaction = this.db.transaction(config.itemsStore, "readwrite");
        let itemStore = transaction.objectStore(config.itemsStore);

        let request = itemStore.getAll();
        request.onerror = (error) => {
            console.log('you have error ' + error);
        }
        request.onsuccess = (event) => {
            callback(request.result);
        }
    }

    Create(item) {
        console.log('item...', item)
        let transaction = this.db.transaction(config.itemsStore, "readwrite");
        let itemStore = transaction.objectStore(config.itemsStore);

        itemStore.put(item);
    }
    CreateGamestateStore(item) {
        let transaction = this.db.transaction(config.gameStateStore, "readwrite");
        let gamestateStore = transaction.objectStore(config.gameStateStore,);

        gamestateStore.put(item);
    }

    CreateGamestaticsStore(item) {
        let transaction = this.db.transaction(config.gameStaticsStore, "readwrite");
        let gamestaticsStore = transaction.objectStore(config.gameStaticsStore,);

        gamestaticsStore.put(item);
    }
    GamestateStoreGetAll(callback) {

        let transaction = this.db.transaction(config.gameStateStore, "readwrite");
        let gamestateStore = transaction.objectStore(config.gameStateStore);

        let request = gamestateStore.getAll();
        request.onerror = (error) => {
            console.log('you have error ' + error);
        }
        request.onsuccess = (event) => {
            callback(request.result);
        }
    }

    GamestaticsStoreGetAll(callback) {

        let transaction = this.db.transaction(config.gameStaticsStore, "readwrite");
        let gamestaticsStore = transaction.objectStore(config.gameStaticsStore);

        let request = gamestaticsStore.getAll();
        request.onerror = (error) => {
            console.log('you have error ' + error);
        }
        request.onsuccess = (event) => {
            callback(request.result);
        }
    }

    CreateGameDarkModeStore(item) {
        let transaction = this.db.transaction(config.gameSettingsStore, "readwrite");
        let gamesettingsStore = transaction.objectStore(config.gameSettingsStore,);

        gamesettingsStore.put(item);
    }

    GameDarkModeStoreGetAll(callback) {

        let transaction = this.db.transaction(config.gameSettingsStore, "readwrite");
        let gamesettingsStore = transaction.objectStore(config.gameSettingsStore);

        let request = gamesettingsStore.getAll();
        request.onerror = (error) => {
            console.log('you have error ' + error);
        }
        request.onsuccess = (event) => {
            callback(request.result);
        }
    }
}

export default new IndexedDBService();
