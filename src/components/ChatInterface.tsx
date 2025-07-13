import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Send, MessageCircle, Bot, User, Loader2 } from "lucide-react";

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChatInterfaceProps {
  studentId: string;
  chapterId: string;
  chapterTitle: string;
  onBack: () => void;
}

export default function ChatInterface({ studentId, chapterId, chapterTitle, onBack }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Initialize chat with welcome message
    const initializeChat = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const welcomeMessage: Message = {
        id: Date.now().toString(),
        content: `Welcome to ${chapterTitle}! I'm your AI tutor. I'll ask you questions to help reinforce your learning. Let's start with your first question:\n\nWhat were the main causes of international tension in the period leading up to World War I?`,
        isUser: false,
        timestamp: new Date(),
      };
      
      setMessages([welcomeMessage]);
      setIsInitialLoading(false);
    };

    initializeChat();
  }, [chapterTitle]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    // Simulate AI response
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Check if user said "no" to continuing
    const isEndingConversation = inputMessage.toLowerCase().includes("no") && messages.length > 2;

    let botResponse = "";
    if (isEndingConversation) {
      botResponse = "Thank you for your participation! You've done great work today. Feel free to select another chapter or continue exploring this one later.";
      setTimeout(() => {
        onBack();
      }, 3000);
    } else {
      // Generate sample responses based on common educational patterns
      const responses = [
        "That's a good observation! Can you elaborate on how economic factors contributed to these tensions?",
        "Excellent point! Now, how do you think the alliance system affected diplomatic relations during this period?",
        "Interesting perspective! What role did nationalism play in shaping international relations?",
        "Good analysis! Can you explain how imperial competition influenced these developments?",
        "That's correct! Now, would you like to explore another question or shall we move to a different topic?",
      ];
      
      botResponse = responses[Math.floor(Math.random() * responses.length)];
    }

    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      content: botResponse,
      isUser: false,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, botMessage]);
    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (isInitialLoading) {
    return (
      <div className="min-h-screen bg-gradient-secondary flex items-center justify-center">
        <Card className="shadow-large border-0 bg-card/95 backdrop-blur-sm p-8">
          <div className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center shadow-medium animate-pulse-soft">
              <MessageCircle className="w-8 h-8 text-primary-foreground" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-foreground">Preparing Your Session</h3>
              <p className="text-muted-foreground mt-2">Loading {chapterTitle}...</p>
            </div>
            <div className="flex justify-center">
              <Loader2 className="w-6 h-6 animate-spin text-primary" />
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-secondary flex flex-col">
      {/* Header */}
      <div className="bg-card/90 backdrop-blur-sm border-b border-border/50 shadow-soft">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="gap-2 hover:bg-accent"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Chapters
          </Button>
          <div className="flex-1">
            <h1 className="text-lg font-semibold text-foreground truncate">
              {chapterTitle}
            </h1>
            <p className="text-sm text-muted-foreground">Interactive Learning Session</p>
          </div>
          <div className="text-sm text-muted-foreground">
            Student: {studentId}
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 max-w-4xl mx-auto w-full px-4 py-6">
        <div className="space-y-4 pb-20">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isUser ? "justify-end" : "justify-start"} animate-fade-in`}
            >
              <div
                className={`flex max-w-[80%] ${
                  message.isUser ? "flex-row-reverse" : "flex-row"
                } items-start space-x-3`}
              >
                <div
                  className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                    message.isUser
                      ? "bg-primary text-primary-foreground"
                      : "bg-accent text-accent-foreground"
                  }`}
                >
                  {message.isUser ? (
                    <User className="w-4 h-4" />
                  ) : (
                    <Bot className="w-4 h-4" />
                  )}
                </div>
                <div
                  className={`rounded-lg p-4 shadow-soft ${
                    message.isUser
                      ? "bg-primary text-primary-foreground"
                      : "bg-card border border-border/50"
                  }`}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">
                    {message.content}
                  </p>
                  <p
                    className={`text-xs mt-2 ${
                      message.isUser
                        ? "text-primary-foreground/70"
                        : "text-muted-foreground"
                    }`}
                  >
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start animate-fade-in">
              <div className="flex items-start space-x-3 max-w-[80%]">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="rounded-lg p-4 bg-card border border-border/50 shadow-soft">
                  <div className="flex items-center space-x-2">
                    <Loader2 className="w-4 h-4 animate-spin text-primary" />
                    <p className="text-sm text-muted-foreground">AI tutor is thinking...</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="bg-card/90 backdrop-blur-sm border-t border-border/50 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex space-x-3">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your response..."
              disabled={isLoading}
              className="flex-1 h-12 shadow-soft border-border/50 focus:border-primary transition-smooth"
            />
            <Button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isLoading}
              size="lg"
              className="gap-2"
            >
              <Send className="w-4 h-4" />
              Send
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}