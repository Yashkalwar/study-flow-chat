import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, GraduationCap } from "lucide-react";

interface LoginPageProps {
  onLogin: (studentId: string) => void;
}

const VALID_STUDENT_IDS = ["S1001", "S1002", "S1003", "S1004"];

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [studentId, setStudentId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!studentId.trim()) {
      setError("Please enter your Student ID");
      return;
    }

    if (!VALID_STUDENT_IDS.includes(studentId.toUpperCase())) {
      setError("Invalid Student ID. Please check and try again.");
      return;
    }

    setIsLoading(true);
    
    // Simulate API call with loading animation
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    onLogin(studentId.toUpperCase());
  };

  return (
    <div className="min-h-screen bg-gradient-secondary flex items-center justify-center p-4">
      <div className="w-full max-w-md animate-scale-in">
        <Card className="shadow-large border-0 bg-card/95 backdrop-blur-sm">
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center shadow-medium">
              <GraduationCap className="w-8 h-8 text-primary-foreground" />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                EduLearn Portal
              </CardTitle>
              <CardDescription className="text-muted-foreground mt-2">
                Enter your Student ID to access your learning materials
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="studentId" className="text-sm font-medium text-foreground">
                  Student ID
                </label>
                <Input
                  id="studentId"
                  type="text"
                  placeholder="Enter your Student ID (e.g., S1001)"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  className="h-12 text-center text-lg font-mono uppercase tracking-wider shadow-soft border-border/50 focus:border-primary transition-smooth"
                  disabled={isLoading}
                />
              </div>

              {error && (
                <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3 animate-slide-up">
                  <p className="text-sm text-destructive font-medium">{error}</p>
                </div>
              )}

              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Logging in...
                  </>
                ) : (
                  "Login"
                )}
              </Button>
            </form>

            <div className="text-center">
              <p className="text-xs text-muted-foreground">
                Valid Student IDs: S1001, S1002, S1003, S1004
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}