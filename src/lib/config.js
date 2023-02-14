import json_stringify from "json-stringify-pretty-compact";

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

const filePickerOptions = {
    excludeAcceptAllOption: true,
    types: [{
        description: 'JSON config file',
        accept: {
            "application/json": ['.json']
        }
    }]
};

export async function load_config_file() {
    const [fileHandle] = await window.showOpenFilePicker(filePickerOptions);
    const file = await fileHandle.getFile();
    const data = await file.text();
    return JSON.parse(data)
}

export async function save_config_file(config) {
    const fileHandle = await window.showSaveFilePicker({
        ...filePickerOptions,
        suggestedName: "new_year_answer_battle_data"
    });
    const writable = await fileHandle.createWritable();
    const data = json_stringify(config);
    await writable.write(data);
    await writable.close();
}

