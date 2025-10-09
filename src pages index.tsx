import { useState } from "react";
import { FileUpload } from "@/components/FileUpload";
import { DataPreview } from "@/components/DataPreview";
import { StatisticsCards } from "@/components/StatisticsCards";
import { PredictionForm, PredictionInputs } from "@/components/PredictionForm";
import { PredictionResult } from "@/components/PredictionResult";
import { DataCharts } from "@/components/DataCharts";
import { InsightsSummary } from "@/components/InsightsSummary";
import { predictPrice } from "@/utils/mlModel";
import { Home } from "lucide-react";

const Index = () => {
  const [data, setData] = useState<any[]>([]);
  const [predictedPrice, setPredictedPrice] = useState<number | null>(null);
  
  const handleFileUpload = (uploadedData: any[]) => {
    setData(uploadedData);
    setPredictedPrice(null);
  };

  const handlePredict = (inputs: PredictionInputs) => {
    const price = predictPrice(inputs, data);
    setPredictedPrice(price);
    
    // Scroll to prediction result
    setTimeout(() => {
      document.getElementById('prediction-result')?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'center'
      });
    }, 100);
  };

  const getUniqueLocations = () => {
    const locations = data.map(row => row.Location || row.location).filter(Boolean);
    return [...new Set(locations)].sort();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-primary py-8 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-primary-foreground/10 rounded-lg">
              <Home className="w-8 h-8 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-primary-foreground">
                🏠 Real Estate House Price Prediction Dashboard
              </h1>
              <p className="text-primary-foreground/90 mt-1">
                Machine Learning powered property price estimation
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Data Upload Section */}
        <section>
          <h2 className="text-2xl font-bold mb-4 text-foreground">1. Data Upload & Overview</h2>
          <FileUpload onFileUpload={handleFileUpload} />
        </section>

        {data.length > 0 && (
          <>
            {/* Statistics Cards */}
            <section>
              <StatisticsCards data={data} />
            </section>

            {/* Data Preview */}
            <section>
              <DataPreview data={data} />
            </section>

            {/* Prediction Section */}
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <h2 className="text-2xl font-bold mb-4 text-foreground">2. Feature Inputs for Prediction</h2>
                <PredictionForm 
                  locations={getUniqueLocations()} 
                  onPredict={handlePredict}
                />
              </div>
              
              {predictedPrice !== null && (
                <div id="prediction-result">
                  <h2 className="text-2xl font-bold mb-4 text-foreground">3. Prediction Result</h2>
                  <PredictionResult predictedPrice={predictedPrice} />
                </div>
              )}
            </section>

            {/* Data Visualization */}
            <section>
              <h2 className="text-2xl font-bold mb-4 text-foreground">4. Data Visualization</h2>
              <DataCharts data={data} />
            </section>

            {/* Insights Summary */}
            <section>
              <h2 className="text-2xl font-bold mb-4 text-foreground">5. Insights Summary</h2>
              <InsightsSummary data={data} />
            </section>
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-16 py-6 border-t border-border">
        <div className="container mx-auto px-4 text-center text-muted-foreground text-sm">
          <p>© 2025 Real Estate Price Prediction Dashboard - Powered by Machine Learning</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
