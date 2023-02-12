export const configLocalStorageName = "config"

export function load_config_local_storage() {
    const result =  localStorage.getItem(configLocalStorageName);
    if (result) {
        let config = JSON.parse(result);
        config.currentPage = 'home';
        return config
    }
    else {
        return undefined
    }
}

export function save_config_local_storage(config) {
    localStorage.setItem(configLocalStorageName, JSON.stringify(config));
}

export function load_config_file() {
    
}

export function save_config_file() {
    
}

