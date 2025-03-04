
import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import {
  LogOut,
  Menu,
  X,
  LightbulbIcon,
  PackageOpen
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import AnimatedContainer from "@/components/ui/AnimatedContainer";

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
    setIsMenuOpen(false);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const menuItems = [
    {
      label: "Dashboard",
      path: "/dashboard",
      icon: <PackageOpen className="w-5 h-5 mr-2" />,
    },
    {
      label: "New Idea",
      path: "/new",
      icon: <LightbulbIcon className="w-5 h-5 mr-2" />,
    },
  ];

  return (
    <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-sm border-b border-border/40">
      <div className="container flex h-16 items-center justify-between py-4">
        <Link to="/" className="flex items-center gap-2">
          <LightbulbIcon className="w-6 h-6 text-primary" />
          <span className="font-medium text-xl">Thought Trove</span>
        </Link>

        {user && (
          <>
            {/* Desktop navigation */}
            <nav className="hidden md:flex items-center gap-6">
              {menuItems.map((item) => (
                <Button
                  key={item.path}
                  variant={isActive(item.path) ? "default" : "ghost"}
                  className={`h-9 ${
                    isActive(item.path) ? "" : "text-muted-foreground"
                  }`}
                  onClick={() => navigate(item.path)}
                >
                  {item.label}
                </Button>
              ))}
            </nav>

            <div className="hidden md:flex items-center gap-4">
              <span className="text-sm text-muted-foreground">
                {user.name}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="gap-2"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>

            {/* Mobile navigation */}
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader className="mb-6">
                  <SheetTitle className="flex items-center">
                    <LightbulbIcon className="w-5 h-5 text-primary mr-2" />
                    Thought Trove
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-4">
                  {menuItems.map((item, index) => (
                    <AnimatedContainer
                      key={item.path}
                      animation="slide-down"
                      delay={50 * index}
                    >
                      <Button
                        variant={isActive(item.path) ? "default" : "ghost"}
                        className="w-full justify-start"
                        onClick={() => {
                          navigate(item.path);
                          setIsMenuOpen(false);
                        }}
                      >
                        {item.icon}
                        {item.label}
                      </Button>
                    </AnimatedContainer>
                  ))}
                  <AnimatedContainer
                    animation="slide-down"
                    delay={50 * menuItems.length}
                  >
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
                      onClick={handleLogout}
                    >
                      <LogOut className="w-5 h-5 mr-2" />
                      Logout
                    </Button>
                  </AnimatedContainer>
                </nav>

                <div className="mt-6 pt-6 border-t border-border">
                  <p className="text-sm text-muted-foreground">
                    Signed in as <strong>{user.name}</strong>
                  </p>
                </div>
              </SheetContent>
            </Sheet>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
