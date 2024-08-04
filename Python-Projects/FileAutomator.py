import os
import time
import shutil
import logging
import hashlib

current_path = "/Users/eduardobenjamin/Desktop/Images"
to_sort_path = "/Users/eduardobenjamin/Desktop/To-Sort"
screenshots_path = "/Users/eduardobenjamin/Desktop/ScreenShots"
images_path = "/Users/eduardobenjamin/Desktop/Images"
pdfs_path = "/Users/eduardobenjamin/Desktop/PDFs"
python_path = "/Users/eduardobenjamin/Desktop/Python-Files"

def process(file_path):
    logging.info(f"Processing file: {file_path}")
    file_name = os.path.basename(file_path)
    _, ext = os.path.splitext(file_path)
    ext = ext.lower()
    print(file_name)
    if 'Screen Shot' in file_name:
        destination = screenshots_path
    elif ext in ['.png', '.jpg', '.jpeg', '.gif']:
        destination = images_path
    elif ext == '.pdf':
        destination = pdfs_path
    elif ext in ['.py', '.ipynb']:
        destination = python_path
    else:
        destination = to_sort_path

    move_file(file_path, destination)

def calculate_hash(file_path):
    hash_algo = hashlib.md5()
    with open(file_path, 'rb') as f:
        for chunk in iter(lambda: f.read(4096), b""):
            hash_algo.update(chunk)
    return hash_algo.hexdigest()

def move_file(src, dest):
    logging.info(f"Moving file from {src} to {dest}")
    if not os.path.exists(dest):
        os.makedirs(dest)
    
    # Check read permission for source file
    if not os.access(src, os.R_OK):
        logging.error(f"No read permission for {src}")
        return
    
    # Check write permission for destination directory
    if not os.access(dest, os.W_OK):
        logging.error(f"No write permission for {dest}")
        return
    
    src_hash = calculate_hash(src)
    dest_path = os.path.join(dest, os.path.basename(src))
    
    for file_name in os.listdir(dest):
        existing_file_path = os.path.join(dest, file_name)
        if os.path.isfile(existing_file_path):
            existing_file_hash = calculate_hash(existing_file_path)
            if src_hash == existing_file_hash:
                logging.info(f"Duplicate file found. Deleting {src}")
                os.remove(src)
                return
    
    if os.path.exists(dest_path):
        base, ext = os.path.splitext(dest_path)
        counter = 1
        new_dest_path = f"{base}_{counter}{ext}"
        while os.path.exists(new_dest_path):
            counter += 1
            new_dest_path = f"{base}_{counter}{ext}"
        dest_path = new_dest_path

    shutil.move(src, dest_path)
    logging.info(f"Moved {src} to {dest_path}")

if __name__ == "__main__":
    logging.basicConfig(level=logging.DEBUG,
                        format='%(asctime)s - %(message)s',
                        datefmt='%Y-%m-%d %H:%M:%S')
    logging.info(f"Started monitoring {current_path}")

    processed_files = set()

    try:
        while True:
            for file_name in os.listdir(current_path):
                file_path = os.path.join(current_path, file_name)
                if os.path.isfile(file_path) and file_path not in processed_files:
                    process(file_path)
                    processed_files.add(file_path)
            time.sleep(10)  # Check every 10 seconds
    except KeyboardInterrupt:
        logging.info("Stopped monitoring")