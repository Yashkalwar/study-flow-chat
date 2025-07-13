import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, MessageCircle, ArrowRight, LogOut } from "lucide-react";

interface Chapter {
  id: string;
  title: string;
  description: string;
  icon?: string;
}

interface ChapterSelectionProps {
  studentId: string;
  onChapterSelect: (chapterId: string, chapterTitle: string) => void;
  onLogout: () => void;
}

const CHAPTERS: Chapter[] = [
  {
    id: "all_chapters",
    title: "All Chapters",
    description: "Quiz Mode - Questions from entire document",
  },
  {
    id: "chapter_1",
    title: "International Relations in an Age of Imperialism",
    description: "1871–1918: Exploring global politics and imperial expansion",
  },
  {
    id: "chapter_2",
    title: "International Relations in an Age of Uncertainty",
    description: "1919–33: Post-WWI reconstruction and diplomatic challenges",
  },
  {
    id: "chapter_3",
    title: "International Relations in an Age of Extremism",
    description: "1919–39: Rise of totalitarian regimes and global tensions",
  },
  {
    id: "chapter_4",
    title: "China and Japan in an Age of Development",
    description: "1919–45: Asian powers and their modernization journey",
  },
  {
    id: "chapter_5",
    title: "The Search for International Peace and Security",
    description: "1919–45: League of Nations and collective security efforts",
  },
];

export default function ChapterSelection({ studentId, onChapterSelect, onLogout }: ChapterSelectionProps) {
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  const handleChapterClick = (chapter: Chapter) => {
    setSelectedCard(chapter.id);
    setTimeout(() => {
      onChapterSelect(chapter.id, chapter.title);
    }, 200);
  };

  return (
    <div className="min-h-screen bg-gradient-secondary">
      {/* Header */}
      <div className="bg-card/80 backdrop-blur-sm border-b border-border/50 shadow-soft">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">EduLearn Portal</h1>
              <p className="text-sm text-muted-foreground">Welcome, {studentId}</p>
            </div>
          </div>
          <Button variant="outline" onClick={onLogout} className="gap-2">
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-8 animate-fade-in">
          <h2 className="text-3xl font-bold text-foreground mb-3">
            Choose Your Learning Path
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Select a chapter to start your interactive learning experience. Each chapter contains 
            curated questions designed to enhance your understanding.
          </p>
        </div>

        {/* Chapter Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-slide-up">
          {CHAPTERS.map((chapter, index) => (
            <Card
              key={chapter.id}
              className={`group cursor-pointer transition-spring hover:shadow-large border-border/50 hover:border-primary/30 transform hover:scale-[1.02] ${
                selectedCard === chapter.id ? "scale-95 opacity-75" : ""
              } ${chapter.id === "all_chapters" ? "md:col-span-2 lg:col-span-1" : ""}`}
              style={{
                animationDelay: `${index * 100}ms`,
              }}
              onClick={() => handleChapterClick(chapter)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg font-semibold text-foreground group-hover:text-primary transition-smooth line-clamp-2">
                      {chapter.title}
                    </CardTitle>
                    <div className="flex items-center mt-2 text-xs text-muted-foreground">
                      <MessageCircle className="w-3 h-3 mr-1" />
                      Interactive Learning
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-spring" />
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <CardDescription className="text-sm text-muted-foreground line-clamp-3">
                  {chapter.description}
                </CardDescription>
              </CardContent>
              
              {/* Hover Effect Gradient */}
              <div className="absolute inset-0 bg-gradient-accent opacity-0 group-hover:opacity-10 transition-smooth rounded-lg pointer-events-none" />
            </Card>
          ))}
        </div>

        {/* Footer Info */}
        <div className="mt-12 text-center animate-fade-in">
          <div className="bg-card/60 backdrop-blur-sm rounded-xl p-6 shadow-soft border border-border/50 max-w-2xl mx-auto">
            <h3 className="text-lg font-semibold text-foreground mb-2">How it works</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Select a chapter to begin an interactive Q&A session. Our AI tutor will ask you questions
              and provide feedback to help reinforce your learning. You can always return to this page
              to choose a different chapter.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}