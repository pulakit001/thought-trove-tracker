
import React from "react";
import Header from "@/components/layout/Header";

const AI: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState(true);

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Header />
      <main className="flex-1 page-container pb-24 flex flex-col overflow-y-auto">
        <div className="mb-4">
          <h1 className="font-mono text-2xl font-bold uppercase tracking-wide mb-2">AI ASSISTANT</h1>
          <p className="font-mono text-sm text-muted-foreground">
            [ASK QUESTIONS OR GET HELP WITH YOUR IDEAS]
          </p>
        </div>
        
        <div className="flex-1 brutalist-container min-h-[500px] relative">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-background z-10">
              <div className="font-mono text-sm text-muted-foreground animate-pulse">
                [LOADING AI ASSISTANT...]
              </div>
            </div>
          )}
          <iframe
            src="https://app.relevanceai.com/agents/d7b62b/44bdb6995e1c-4606-9cb0-7278cff6c064/e008947c-9687-451c-aba3-8581f6cc9242/embed-chat?hide_tool_steps=false&hide_file_uploads=false&hide_conversation_list=false&bubble_style=agent&primary_color=%23000000&bubble_icon=pd%2Fchat&input_placeholder_text=Type+your+Idea.....&hide_logo=false"
            className="w-full h-full min-h-[500px]"
            allow="microphone"
            title="AI Assistant"
            onLoad={() => setIsLoading(false)}
          />
        </div>
      </main>
    </div>
  );
};

export default AI;
