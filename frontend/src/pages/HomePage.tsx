import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Camera, Leaf, AlertCircle, ArrowRight } from "lucide-react";
import Card, {
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../components/ui/Card";
import Button from "../components/ui/Button";
import { diseases, alerts } from "../utils/mockData";

function toCamelCase(id: string): string {
  return id.replace(/-([a-z])/g, (g: string) => g[1].toUpperCase());
}

const HomePage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center bg-gradient-to-r from-primary-700 to-primary-600 overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1599328580087-15c9dab481f3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>

        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              {t("home.hero.title")}
            </h1>
            <p className="text-xl md:text-2xl text-primary-100 mb-8">
              {t("home.hero.subtitle")}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/detection">
                <Button
                  variant="primary"
                  size="lg"
                  className="bg-white text-primary-700 hover:bg-primary-50"
                >
                  <Camera className="mr-2 h-5 w-5" />
                  {t("home.hero.detectNow")}
                </Button>
              </Link>
              <Link to="/disease-info">
                <Button
                  variant="outline"
                  size="lg"
                  className="bg-transparent border-white text-white hover:bg-white/10"
                >
                  {t("home.hero.learnMore")}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Diseases Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              {t("home.featuredDiseases.title")}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t("home.featuredDiseases.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {diseases
              .filter(disease => 
                disease.id === 'rice-blast' || 
                disease.id === 'bacterial-leaf-blight' || 
                disease.id === 'brown-spot'
              )
              .map((disease) => (
              <Card key={disease.id} hoverable className="h-full">
                <CardHeader>
                  <div className="w-full h-48 rounded-lg overflow-hidden mb-4">
                    <img
                      src={disease.images[0]}
                      alt={disease.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardTitle>
                    {t(`home.diseaseItems.${toCamelCase(disease.id)}.name`)}
                  </CardTitle>
                  <CardDescription>
                    {t(`home.diseaseItems.${toCamelCase(disease.id)}.description`)}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link to={`/disease-info?disease=${disease.id}`}>
                    <Button variant="outline" className="w-full">
                      {t("common.moreInfo")}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              {t("home.howItWorks.title")}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">
                {t("home.howItWorks.step1")}
              </h3>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">
                {t("home.howItWorks.step2")}
              </h3>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">
                {t("home.howItWorks.step3")}
              </h3>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">4</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">
                {t("home.howItWorks.step4")}
              </h3>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Alerts Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">
              {t("home.recentAlerts.title")}
            </h2>
            <Link
              to="/notifications"
              className="text-primary-600 hover:text-primary-700 flex items-center"
            >
              {t("home.recentAlerts.viewAll")}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {alerts.slice(0, 2).map((alert) => (
              <Card key={alert.id} className="border-l-4 border-warning-500">
                <CardHeader>
                  <div className="flex items-start">
                    <AlertCircle className="h-6 w-6 text-warning-500 mr-2 mt-1" />
                    <div>
                      <CardTitle>{alert.title}</CardTitle>
                      <CardDescription className="text-sm text-gray-500 mt-1">
                        {new Date(alert.date).toLocaleDateString()} •{" "}
                        {alert.type}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">{alert.message}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-50">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center mb-6">
            <Leaf className="h-16 w-16 text-primary-500" />
          </div>
          <h2 className="text-3xl font-bold mb-4">
            Start protecting your paddy crops today
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Early detection and timely action can save your harvest and improve
            yield quality.
          </p>
          <Link to="/detection">
            <Button variant="primary" size="lg">
              <Camera className="mr-2 h-5 w-5" />
              {t("home.hero.detectNow")}
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
