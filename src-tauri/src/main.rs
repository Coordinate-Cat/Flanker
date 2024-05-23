#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
#[tauri::command]
fn main() {
    tauri::Builder::default()
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
