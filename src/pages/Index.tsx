import { useState } from "react";
import LoginPage from "@/components/LoginPage";
import ChapterSelection from "@/components/ChapterSelection";
import ChatInterface from "@/components/ChatInterface";

type AppState = "login" | "chapters" | "chat";

interface UserData {
  studentId: string;
  selectedChapter?: {
    id: string;
    title: string;
  };
}

const Index = () => {
  const [appState, setAppState] = useState<AppState>("login");
  const [userData, setUserData] = useState<UserData>({ studentId: "" });

  const handleLogin = (studentId: string) => {
    setUserData({ studentId });
    setAppState("chapters");
  };

  const handleChapterSelect = (chapterId: string, chapterTitle: string) => {
    setUserData(prev => ({
      ...prev,
      selectedChapter: { id: chapterId, title: chapterTitle }
    }));
    setAppState("chat");
  };

  const handleBackToChapters = () => {
    setAppState("chapters");
  };

  const handleLogout = () => {
    setUserData({ studentId: "" });
    setAppState("login");
  };

  switch (appState) {
    case "login":
      return <LoginPage onLogin={handleLogin} />;
    
    case "chapters":
      return (
        <ChapterSelection
          studentId={userData.studentId}
          onChapterSelect={handleChapterSelect}
          onLogout={handleLogout}
        />
      );
    
    case "chat":
      return userData.selectedChapter ? (
        <ChatInterface
          studentId={userData.studentId}
          chapterId={userData.selectedChapter.id}
          chapterTitle={userData.selectedChapter.title}
          onBack={handleBackToChapters}
        />
      ) : null;
    
    default:
      return <LoginPage onLogin={handleLogin} />;
  }
};

export default Index;
