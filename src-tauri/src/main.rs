#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod system_info;

use system_info::get_system_info;

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![get_system_info])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
