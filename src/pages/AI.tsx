
import React from "react";
import Header from "@/components/layout/Header";
import AnimatedContainer from "@/components/ui/AnimatedContainer";

const AI: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container py-8 pb-24 md:pb-8 flex flex-col">
        <AnimatedContainer animation="fade" className="mb-4">
          <h1 className="text-3xl font-bold">AI Assistant</h1>
          <p className="text-muted-foreground">
            Ask questions or get help with your ideas
          </p>
        </AnimatedContainer>
        
        <AnimatedContainer 
          animation="scale" 
          className="flex-1 rounded-lg overflow-hidden border border-border min-h-[500px]"
        >
          <iframe
            src="https://app.relevanceai.com/agents/d7b62b/44bdb6995e1c-4606-9cb0-7278cff6c064/e008947c-9687-451c-aba3-8581f6cc9242/embed-chat?hide_tool_steps=false&hide_file_uploads=false&hide_conversation_list=false&bubble_style=agent&primary_color=%23271cfd&bubble_icon=pd%2Fchat&input_placeholder_text=Type+your+Idea.....&hide_logo=false"
            className="w-full h-full min-h-[500px]"
            allow="microphone"
            title="AI Assistant"
          />
        </AnimatedContainer>
      </main>
    </div>
  );
};

export default AI;
