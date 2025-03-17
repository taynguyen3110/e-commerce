import json
import os
from openai import OpenAI

# Read products data
def load_products():
    with open('products.json', 'r') as file:
        data = json.load(file)
        # Access the 'products' array from the JSON structure
        return data['products']

# Prepare training data in the correct format
def prepare_training_data(products):
    training_data = []
    
    for product in products:
        # Create training examples including more product details
        qa_pairs = [
            {
                "messages": [
                    {"role": "system", "content": "You are a product expert for our e-commerce store."},
                    {"role": "user", "content": f"Tell me about the {product['name']}"},
                    {"role": "assistant", "content": f"The {product['name']} is priced at ${product['price']}. {product['description']} It belongs to the {product['category']} category and has a rating of {product['rating']}. " + (f"It's currently on sale with {product['sale']}% off!" if product['sale'] > 0 else "")}
                ]
            },
            {
                "messages": [
                    {"role": "system", "content": "You are a product expert for our e-commerce store."},
                    {"role": "user", "content": f"What colors and sizes are available for {product['name']}?"},
                    {"role": "assistant", "content": format_sizes_colors(product['sizesColors'])}
                ]
            },
            {
                "messages": [
                    {"role": "system", "content": "You are a product expert for our e-commerce store."},
                    {"role": "user", "content": f"What's the price and any ongoing sale for {product['name']}?"},
                    {"role": "assistant", "content": f"The {product['name']} is priced at ${product['price']}" + (f" and is currently on sale with {product['sale']}% off!" if product['sale'] > 0 else ".")}
                ]
            }
        ]
        training_data.extend(qa_pairs)
    
    return training_data

def format_sizes_colors(sizes_colors):
    """Helper function to format sizes and colors information"""
    response_parts = []
    for size_info in sizes_colors:
        size = size_info['size']
        available_colors = [color['color'] for color in size_info['colors'] if color['stock'] > 0]
        if available_colors:
            response_parts.append(f"Size {size} is available in {', '.join(available_colors)}")
    
    if response_parts:
        return "Available options: " + ". ".join(response_parts)
    return "Currently out of stock in all sizes and colors."

# Save training data in JSONL format
def save_training_data(training_data, output_file='training_data.jsonl'):
    with open(output_file, 'w') as file:
        for entry in training_data:
            json.dump(entry, file)
            file.write('\n')

# Fine-tune the model
def fine_tune_model(training_file_path):
    client = OpenAI(api_key=os.environ.get('OPENAI_API_KEY'))
    
    try:
        # Upload the training file
        with open(training_file_path, 'rb') as file:
            upload_response = client.files.create(
                file=file,
                purpose='fine-tune'
            )
        
        print(f"File uploaded successfully. File ID: {upload_response.id}")
        
        # Create fine-tuning job
        job = client.fine_tuning.jobs.create(
            training_file=upload_response.id,
            model="gpt-4o-mini-2024-07-18"
        )
        
        print(f"Fine-tuning job created. Job ID: {job.id}")
        return job.id
        
    except Exception as e:
        print(f"An error occurred: {str(e)}")
        return None

def main():
    # Ensure OPENAI_API_KEY is set
    if not os.environ.get('OPENAI_API_KEY'):
        print("Please set your OPENAI_API_KEY environment variable")
        return
    
    print("Loading products data...")
    products = load_products()
    print(f"Loaded {len(products)} products")
    
    print("Preparing training data...")
    training_data = prepare_training_data(products)
    print(f"Created {len(training_data)} training examples")
    
    training_file = 'training_data.jsonl'
    print(f"Saving training data to {training_file}...")
    save_training_data(training_data, training_file)
    
    print("Starting fine-tuning process...")
    job_id = fine_tune_model(training_file)
    
    if job_id:
        print(f"""
Fine-tuning process started successfully!
Job ID: {job_id}
You can check the status of your fine-tuning job using the OpenAI dashboard.
Once complete, update your AI service with the fine-tuned model ID.
        """)

if __name__ == "__main__":
    main() 