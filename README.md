# global-insight-dashboard
A responsive web application built to consume the public REST Countries API, allowing users to search, filter, and compare country metrics side-by-side. Designed with high resilience against network latencies and malicious inputs.

# Global Insight: Country Comparison & Resilience Dashboard

A modern, responsive, and resilient single-page web application built to consume the public REST Countries API. The application enables users to search for world countries, view detailed metrics, and perform side-by-side comparisons in an interactive UI dashboard. 

The core highlight of this project is its strict adherence to application resilience—gracefully handling network throttling, server errors, and untrusted user inputs.

## 🚀 Live on Production / Local Run Steps

Follow these instructions to boot and run the project locally on a completely fresh machine:

### Prerequisites
- Ensure you have **Node.js** installed (Version `18.0.0` or higher is recommended).
- A package manager like `npm` (comes bundled with Node.js).

### Installation Steps

1. **Clone the Repository:**
   ```bash
   git clone <your-github-repo-url>
   cd <your-repo-folder-name>

2. **Install Dependencies:**
Install required packages (including lucide-react for responsive dashboard iconography and Tailwind CSS setups).

    ```bash
    npm install
    npm install lucide-react

3. **Run the Local Development Server:**

    ```bash 
    npm run dev

4. **Access the Application:**

    Open your preferred browser and navigate to:
    http://localhost:3000

💡 **API Key Setup Notice:**
-
This application utilizes the public, open-access instance of https://restcountries.com/. It requires zero API Keys or .env credential tokens, ensuring immediate, friction-free setup and evaluation for the reviewer.

✨**Key Features**
-
Semantic Text Search: Instant lookup of countries by common or official names.

Side-by-Side Comparison Slot: Pin up to two countries dynamically to contrast crucial socio-economic metrics (Population, Area, Currencies, Regions).

Graceful Network Timeout Layer: Halts freezing requests if the API server undergoes high lag.

Strict Input Validation: Rejects destructive characters before creating network requests.