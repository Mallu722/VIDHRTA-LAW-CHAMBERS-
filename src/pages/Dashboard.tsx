import { useState, useEffect, useRef } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import { 
  Users, 
  Clock, 
  Calendar, 
  Briefcase, 
  CheckCircle,
  BarChart3,
  Search,
  Filter,
  Download,
  Plus,
  Inbox,
  ExternalLink,
  MessageCircle,
  Image as ImageIcon,
  Video,
  Star,
  Save,
  Trash2,
  X,
  FileText,
  Upload,
  Link as LinkIcon,
  LogOut,
  Gavel,
  MapPin,
  ClipboardList
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { getBookings, updateBooking, Booking, CaseMedia, CaseReview, ASSOCIATES, CaseHistoryItem, getBookingsCloud, saveBookingsCloud, getAdminPassword, getAdminPasswordCloud, saveAdminPasswordCloud, deleteBookingCloud } from "@/lib/storage";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadType, setUploadType] = useState<"photo" | "video" | "file">("file");

  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem("vidhrta_admin_authenticated") === "true";
  });
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState(false);

  // Password management states
  const [adminPassword, setAdminPassword] = useState(() => getAdminPassword());
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const [currentPasswordInput, setCurrentPasswordInput] = useState("");
  const [newPasswordInput, setNewPasswordInput] = useState("");
  const [confirmPasswordInput, setConfirmPasswordInput] = useState("");

  // e-Court tracking state
  const [newAction, setNewAction] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newUpdatedBy, setNewUpdatedBy] = useState("");
  const [newHistoryDate, setNewHistoryDate] = useState(() => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  });

  const getCaseStateColor = (state?: string) => {
    switch (state) {
      case "Filing/Drafting": return "text-slate-600 bg-slate-50 border-slate-200";
      case "Admission": return "text-blue-600 bg-blue-50 border-blue-200";
      case "Interim Relief": return "text-amber-600 bg-amber-50 border-amber-200";
      case "Evidence": return "text-indigo-600 bg-indigo-50 border-indigo-200";
      case "Arguments": return "text-purple-600 bg-purple-50 border-purple-200";
      case "Judgment Pending": return "text-rose-600 bg-rose-50 border-rose-200";
      case "Disposed": return "text-emerald-600 bg-emerald-50 border-emerald-200";
      default: return "text-slate-500 bg-slate-50 border-slate-200";
    }
  };

  const handleAddHistoryItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBooking || !newAction || !newDescription) {
      toast({
        variant: "destructive",
        title: "Missing Fields",
        description: "Please enter an action and description for the update.",
      });
      return;
    }

    const newItem: CaseHistoryItem = {
      id: Math.random().toString(36).substr(2, 9),
      date: new Date(newHistoryDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      action: newAction,
      description: newDescription,
      updatedBy: newUpdatedBy || "Admin"
    };

    const updatedHistory = [newItem, ...(selectedBooking.history || [])];
    setSelectedBooking({
      ...selectedBooking,
      history: updatedHistory
    });

    // Reset fields
    setNewAction("");
    setNewDescription("");
    setNewUpdatedBy("");
    
    toast({
      title: "Update Staged",
      description: "Case status update has been added. Click 'Save Changes' to commit.",
    });
  };

  // New Case Modal states
  const [isNewCaseOpen, setIsNewCaseOpen] = useState(false);
  const [newClient, setNewClient] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newSubject, setNewSubject] = useState("");
  const [newCaseDescription, setNewCaseDescription] = useState("");
  const [newCaseNumber, setNewCaseNumber] = useState("");
  const [newCourtName, setNewCourtName] = useState("");
  const [newAssignedAssociate, setNewAssignedAssociate] = useState("");
  const [newCaseState, setNewCaseState] = useState("Filing/Drafting");
  const [newStatus, setNewStatus] = useState<"Pending" | "Confirmed" | "Completed" | "Cancelled">("Confirmed");

  const handleCreateCase = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClient || !newEmail || !newSubject) {
      toast({
        variant: "destructive",
        title: "Missing Required Fields",
        description: "Please fill in Client Name, Email, and Subject.",
      });
      return;
    }

    const newBooking: Booking = {
      id: Math.random().toString(36).substr(2, 9),
      client: newClient,
      phone: newPhone,
      email: newEmail,
      subject: newSubject,
      message: newCaseDescription,
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      status: newStatus,
      createdAt: new Date().toISOString(),
      caseDescription: newCaseDescription,
      assignedAssociate: newAssignedAssociate,
      courtName: newCourtName,
      caseState: newCaseState,
      caseNumber: newCaseNumber,
      media: [],
      reviews: [
        {
          id: "r1",
          author: "System",
          rating: 5,
          comment: "Consultation case created by administrator.",
          date: new Date().toLocaleDateString()
        }
      ],
      history: [
        {
          id: "h1",
          date: new Date().toLocaleDateString(),
          action: "Case Initialized",
          description: `Case folder created. Assigned to ${newAssignedAssociate || "Unassigned"}. Stage: ${newCaseState}.`,
          updatedBy: "Admin"
        }
      ]
    };

    const stored = localStorage.getItem("vidhrta_bookings");
    let bookingsList: Booking[] = [];
    if (stored) {
      try {
        bookingsList = JSON.parse(stored);
      } catch (err) {
        console.error(err);
      }
    }
    const updated = [newBooking, ...bookingsList];
    localStorage.setItem("vidhrta_bookings", JSON.stringify(updated));
    setBookings(updated);

    // Sync to cloud database
    saveBookingsCloud(updated).catch(console.error);

    // Reset fields
    setNewClient("");
    setNewPhone("");
    setNewEmail("");
    setNewSubject("");
    setNewCaseDescription("");
    setNewCaseNumber("");
    setNewCourtName("");
    setNewAssignedAssociate("");
    setNewCaseState("Filing/Drafting");
    setNewStatus("Confirmed");
    setIsNewCaseOpen(false);

    toast({
      title: "Case Created",
      description: "A new consultation and case record has been added successfully.",
    });
  };

  useEffect(() => {
    // Load local cache immediately for instant response
    if (isAuthenticated) {
      setBookings(getBookings());
    }

    // Sync bookings and admin password from cloud on mount
    getAdminPasswordCloud().then((p) => {
      setAdminPassword(p);
    }).catch(console.error);

    if (isAuthenticated) {
      getBookingsCloud().then((cloudData) => {
        if (cloudData) {
          setBookings(cloudData);
        }
      }).catch(console.error);
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginPassword === adminPassword) {
      setIsAuthenticated(true);
      sessionStorage.setItem("vidhrta_admin_authenticated", "true");
      setLoginError(false);
      toast({
        title: "Access Granted",
        description: "Welcome back to the Admin Console.",
      });
    } else {
      setLoginError(true);
      toast({
        variant: "destructive",
        title: "Access Denied",
        description: "Invalid administrator password.",
      });
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("vidhrta_admin_authenticated");
    toast({
      title: "Logged Out",
      description: "You have been securely logged out.",
    });
  };

  const handleChangePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentPasswordInput !== adminPassword) {
      toast({
        variant: "destructive",
        title: "Incorrect Password",
        description: "The current password you entered is incorrect.",
      });
      return;
    }
    if (newPasswordInput !== confirmPasswordInput) {
      toast({
        variant: "destructive",
        title: "Passwords Do Not Match",
        description: "New password and confirmation password do not match.",
      });
      return;
    }
    if (newPasswordInput.length < 4) {
      toast({
        variant: "destructive",
        title: "Password Too Short",
        description: "Password must be at least 4 characters long.",
      });
      return;
    }

    saveAdminPasswordCloud(newPasswordInput).then((success) => {
      if (success) {
        setAdminPassword(newPasswordInput);
        setIsChangePasswordOpen(false);
        setCurrentPasswordInput("");
        setNewPasswordInput("");
        setConfirmPasswordInput("");
        toast({
          title: "Password Updated",
          description: "Admin password has been updated across all devices successfully.",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Update Failed",
          description: "Failed to update password in the cloud database.",
        });
      }
    }).catch((err) => {
      console.error(err);
      toast({
        variant: "destructive",
        title: "Error",
        description: "An unexpected error occurred while updating the password.",
      });
    });
  };

  const handleDeleteCase = (id: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent opening case detail view
    if (window.confirm("Are you sure you want to permanently delete this case?")) {
      deleteBookingCloud(id).then((success) => {
        if (success) {
          setBookings((prev) => prev.filter((b) => b.id !== id));
          toast({
            title: "Case Deleted",
            description: "The case has been permanently deleted from all devices.",
          });
        } else {
          toast({
            variant: "destructive",
            title: "Deletion Failed",
            description: "Failed to delete the case from the database.",
          });
        }
      }).catch((err) => {
        console.error(err);
        toast({
          variant: "destructive",
          title: "Error",
          description: "An unexpected error occurred.",
        });
      });
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 bg-[url('https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center">
        <div className="absolute inset-0 bg-primary/90 backdrop-blur-sm" />
        <ScrollReveal>
          <Card className="w-full max-w-md bg-white/95 backdrop-blur shadow-2xl border-none relative z-10 p-4">
            <CardHeader className="text-center pb-8">
              <div className="mx-auto w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mb-6 border border-gold/20">
                <Users className="w-8 h-8 text-gold" />
              </div>
              <CardTitle className="text-3xl font-heading mb-2">Admin Console</CardTitle>
              <CardDescription className="text-slate-500 font-medium tracking-wide border-t border-slate-100 pt-4 mt-4">
                VIDHRTA LAW CHAMBERS
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-3">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground pl-1">
                    Security Key
                  </label>
                  <div className="relative">
                    <Input 
                      type="password" 
                      placeholder="Enter administrator password" 
                      className={`h-12 bg-slate-50 border-slate-200 focus:ring-gold focus:border-gold px-4 text-center tracking-widest ${loginError ? "border-red-500 bg-red-50" : ""}`}
                      value={loginPassword}
                      onChange={(e) => {
                        setLoginPassword(e.target.value);
                        setLoginError(false);
                      }}
                      autoFocus
                    />
                  </div>
                  {loginError && (
                    <p className="text-red-500 text-[10px] font-bold uppercase text-center mt-2 tracking-wider">
                      Authentication Failed
                    </p>
                  )}
                </div>
                <Button type="submit" variant="gold" className="w-full h-12 text-sm uppercase tracking-widest font-bold shadow-lg shadow-gold/20">
                  Access Dashboard
                </Button>
                <div className="text-center">
                  <a href="mailto:huddarakshay@gmail.com" className="text-[10px] text-muted-foreground hover:text-gold transition-colors font-medium">
                    Forgot Password? Contact Master Administrator
                  </a>
                </div>
              </form>
            </CardContent>
          </Card>
        </ScrollReveal>
      </div>
    );
  }

  const handleUpdate = () => {
    if (selectedBooking) {
      updateBooking(selectedBooking.id, selectedBooking);
      setBookings(getBookings());
      toast({
        title: "Case Updated",
        description: "All changes have been saved successfully.",
      });
    }
  };

  const handleFileClick = (type: "photo" | "video" | "file") => {
    setUploadType(type);
    setTimeout(() => fileInputRef.current?.click(), 0);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      processFiles(files);
    }
    // Reset file input so same file can be uploaded again
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const processFiles = (files: FileList) => {
    if (!selectedBooking) return;

    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        let type: "photo" | "video" | "file" = "file";
        
        if (file.type.startsWith("image/")) type = "photo";
        else if (file.type.startsWith("video/")) type = "video";

        const newMedia: CaseMedia = {
          id: Math.random().toString(36).substr(2, 9),
          type: type,
          url: result,
          title: file.name,
          size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`
        };

        setSelectedBooking(prev => {
          if (!prev) return null;
          return { ...prev, media: [...(prev.media || []), newMedia] };
        });

        toast({
          title: "File Added",
          description: `${file.name} added to repository.`,
        });
      };
      reader.readAsDataURL(file);
    });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
    }
  };

  const filteredBookings = bookings.filter(booking => 
    booking.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Confirmed": return "text-green-600 bg-green-50 border-green-200";
      case "Pending": return "text-amber-600 bg-amber-50 border-amber-200";
      case "Cancelled": return "text-red-600 bg-red-50 border-red-200";
      case "Completed": return "text-blue-600 bg-blue-50 border-blue-200";
      default: return "text-slate-600 bg-slate-50 border-slate-200";
    }
  };

  const stats = [
    { label: "Total Bookings", value: bookings.length.toString(), icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Pending", value: bookings.filter(b => b.status === "Pending").length.toString(), icon: Clock, color: "text-amber-600", bg: "bg-amber-50" },
    { label: "Active Cases", value: bookings.filter(b => b.status === "Confirmed").length.toString(), icon: Briefcase, color: "text-emerald-600", bg: "bg-emerald-50" },
    { label: "Completion Rate", value: bookings.length > 0 ? `${Math.round((bookings.filter(b => b.status === "Completed").length / bookings.length) * 100)}%` : "0%", icon: BarChart3, color: "text-purple-600", bg: "bg-purple-50" },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        className="hidden" 
        multiple 
        accept={uploadType === "photo" ? "image/*" : uploadType === "video" ? "video/*" : "*"}
      />
      {/* Dashboard Header */}
      <section className="bg-primary pt-32 pb-12">
        <div className="container-wide section-padding">
          <ScrollReveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <span className="text-gold text-xs tracking-[0.4em] uppercase font-semibold mb-4 block">Administration</span>
                <h1 className="text-primary-foreground">Lawyer Dashboard</h1>
                <p className="text-primary-foreground/65 text-lg mt-4 max-w-2xl">
                  Overview of all book inquiries, appointments, and client communications.
                </p>
              </div>
              <div className="flex gap-4">
                <Button variant="ghost" className="border border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground bg-transparent" onClick={() => setIsChangePasswordOpen(true)}>
                  Change Password
                </Button>
                <Button variant="ghost" className="border border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground bg-transparent" onClick={handleLogout}>
                  <LogOut className="w-4 h-4 mr-2" /> Logout
                </Button>
                <Button variant="ghost" className="border border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground bg-transparent">
                  <Download className="w-4 h-4 mr-2" /> Export Report
                </Button>
                <Button variant="gold" onClick={() => setIsNewCaseOpen(true)}>
                  <Plus className="w-4 h-4 mr-2" /> New Case
                </Button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container-wide section-padding">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {stats.map((stat, i) => (
              <ScrollReveal delay={i * 100} key={stat.label}>
                <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-6 flex items-center gap-4">
                    <div className={`p-3 rounded-lg ${stat.bg}`}>
                      <stat.icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
                      <h3 className="text-2xl font-bold">{stat.value}</h3>
                    </div>
                  </CardContent>
                </Card>
              </ScrollReveal>
            ))}
          </div>

          <div className="space-y-6">
            {/* Bookings Table */}
            <ScrollReveal>
              <Card className="border-none shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-7">
                  <div>
                    <CardTitle className="text-xl font-bold">Case Registry</CardTitle>
                    <CardDescription>Manage your consultations, client cases, and e-Court states</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input 
                        placeholder="Search queries..." 
                        className="pl-9 h-9 w-[200px] bg-slate-50 border-none"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <Button variant="ghost" size="icon" className="h-9 w-9">
                      <Filter className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                      <thead>
                        <tr className="border-b border-slate-100">
                          <th className="pb-4 font-semibold text-slate-900">Client & Case</th>
                          <th className="pb-4 font-semibold text-slate-900">Assigned Advocate / Court</th>
                          <th className="pb-4 font-semibold text-slate-900">Case Stage</th>
                          <th className="pb-4 font-semibold text-slate-900 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50">
                        {filteredBookings.map((booking) => (
                          <tr key={booking.id} className="group hover:bg-slate-50 transition-colors cursor-pointer" onClick={() => { setSelectedBooking({ ...booking }); setIsModalOpen(true); }}>
                            <td className="py-4">
                              <div className="font-medium text-slate-900 flex items-center gap-2">
                                {booking.client}
                                {booking.caseNumber && (
                                  <span className="text-[10px] font-mono bg-slate-100 border border-slate-200 text-slate-700 px-1.5 py-0.5 rounded font-bold uppercase">
                                    {booking.caseNumber}
                                  </span>
                                )}
                              </div>
                              <div className="text-xs text-muted-foreground">{booking.email}</div>
                            </td>
                            <td className="py-4">
                              <div className="font-semibold text-slate-900 flex items-center gap-1.5">
                                <Users className="w-3.5 h-3.5 text-gold/70" />
                                {booking.assignedAssociate ? (
                                  <span className="text-slate-800">{booking.assignedAssociate}</span>
                                ) : (
                                  <span className="text-slate-400 italic font-normal">Unassigned</span>
                                )}
                              </div>
                              <div className="text-xs text-muted-foreground max-w-[200px] truncate">{booking.courtName || "No Court Forum Set"}</div>
                            </td>
                            <td className="py-4">
                              <div className="mb-1">
                                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold border ${getCaseStateColor(booking.caseState)}`}>
                                  {booking.caseState || "Filing/Drafting"}
                                </span>
                              </div>
                              <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-medium border ${getStatusColor(booking.status)}`}>
                                {booking.status}
                              </span>
                            </td>
                            <td className="py-4 text-right">
                              <div className="flex gap-2 justify-end">
                                <Button variant="ghost" size="sm" className="h-8 px-2 text-gold hover:text-gold hover:bg-gold/10">
                                  Manage Hub <ExternalLink className="w-3 h-3 ml-1.5" />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  className="h-8 w-8 text-rose-500 hover:text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-100"
                                  onClick={(e) => handleDeleteCase(booking.id, e)}
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {filteredBookings.length === 0 && (
                    <div className="py-20 text-center space-y-4">
                      <div className="mx-auto w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center">
                        <Inbox className="w-6 h-6 text-slate-400" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-slate-900 font-medium">No bookings yet</p>
                        <p className="text-sm text-muted-foreground max-w-xs mx-auto">
                          New legal inquiries and appointments will appear here once they are received through the booking form.
                        </p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Case Hub Modal */}
      <Dialog open={isModalOpen} onOpenChange={(open) => { 
        if (!open) setSelectedBooking(null);
        setIsModalOpen(open); 
      }}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white p-0">
          {selectedBooking && (
            <div className="flex flex-col h-full">
              {/* Modal Header */}
              <div className="bg-primary p-8 text-primary-foreground">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-gold text-[10px] tracking-[0.3em] uppercase font-bold mb-2 block">Case Hub</span>
                    <h2 className="text-3xl font-heading mb-2">{selectedBooking.client}</h2>
                    <div className="flex gap-4 text-sm text-primary-foreground/60">
                      <span className="flex items-center gap-1.5"><MessageCircle className="w-4 h-4" /> {selectedBooking.email}</span>
                      <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> Joined: {selectedBooking.date}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="gold" size="sm" onClick={handleUpdate}>
                      <Save className="w-4 h-4 mr-2" /> Save Changes
                    </Button>
                  </div>
                </div>
              </div>

              {/* Modal Tabs */}
              <Tabs defaultValue="overview" className="flex-1 overflow-hidden">
                <div className="px-8 border-b border-slate-100">
                  <TabsList className="bg-transparent gap-8 h-14 p-0">
                    <TabsTrigger value="overview" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-gold rounded-none h-full px-0 font-bold uppercase text-[10px] tracking-widest">Overview</TabsTrigger>
                    <TabsTrigger value="tracker" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-gold rounded-none h-full px-0 font-bold uppercase text-[10px] tracking-widest">Case Tracker</TabsTrigger>
                    <TabsTrigger value="media" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-gold rounded-none h-full px-0 font-bold uppercase text-[10px] tracking-widest">Case Media</TabsTrigger>
                    <TabsTrigger value="reviews" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-gold rounded-none h-full px-0 font-bold uppercase text-[10px] tracking-widest">Reviews & Notes</TabsTrigger>
                  </TabsList>
                </div>

                <div className="p-8 pb-12 overflow-y-auto">
                  <TabsContent value="overview" className="mt-0 space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-6">
                        <div>
                          <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3 block">Case Status</label>
                          <select 
                            className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-gold"
                            value={selectedBooking.status}
                            onChange={(e) => setSelectedBooking({...selectedBooking, status: e.target.value as any})}
                          >
                            <option value="Pending">Pending Review</option>
                            <option value="Confirmed">Active Consultation</option>
                            <option value="Completed">Case Closed</option>
                            <option value="Cancelled">Inquiry Dropped</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3 block">Case Subject</label>
                          <Input 
                            value={selectedBooking.subject}
                            onChange={(e) => setSelectedBooking({...selectedBooking, subject: e.target.value})}
                            className="bg-slate-50 border-slate-200"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3 block">Client Phone</label>
                          <Input 
                            value={selectedBooking.phone}
                            onChange={(e) => setSelectedBooking({...selectedBooking, phone: e.target.value})}
                            className="bg-slate-50 border-slate-200"
                          />
                        </div>
                      </div>
                      <div className="space-y-6">
                        <div>
                          <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3 block">Case Description & Details</label>
                          <Textarea 
                            rows={10}
                            placeholder="Add detailed case notes, history, and requirements..."
                            value={selectedBooking.caseDescription || ""}
                            onChange={(e) => setSelectedBooking({...selectedBooking, caseDescription: e.target.value})}
                            className="bg-slate-50 border-slate-200 resize-none h-[220px]"
                          />
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="tracker" className="mt-0 space-y-8 animate-fade-in">
                    {/* Case Registry Details Card */}
                    <div className="bg-slate-50/70 p-6 rounded-xl border border-slate-200 grid grid-cols-1 md:grid-cols-2 gap-6 shadow-sm">
                      <div className="space-y-4">
                        <div>
                          <label className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 block">Case Number / Citation</label>
                          <div className="relative">
                            <Gavel className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <Input 
                              placeholder="e.g. WP 8492/2026 or OS 123/2026"
                              value={selectedBooking.caseNumber || ""}
                              onChange={(e) => setSelectedBooking({...selectedBooking, caseNumber: e.target.value})}
                              className="bg-white border-slate-200 pl-10 h-10"
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 block">Court Forum</label>
                          <div className="relative">
                            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <Input 
                              placeholder="e.g. High Court of Karnataka, Bengaluru"
                              value={selectedBooking.courtName || ""}
                              onChange={(e) => setSelectedBooking({...selectedBooking, courtName: e.target.value})}
                              className="bg-white border-slate-200 pl-10 h-10"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <label className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 block">Assigned Associate</label>
                          <select 
                            className="w-full h-10 px-3 bg-white border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-gold"
                            value={selectedBooking.assignedAssociate || ""}
                            onChange={(e) => setSelectedBooking({...selectedBooking, assignedAssociate: e.target.value})}
                          >
                            <option value="">Select Associate...</option>
                            {ASSOCIATES.map((a) => (
                              <option key={a.name} value={a.name}>{a.name}</option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 block">Current Case Stage (e-Court States)</label>
                          <select 
                            className="w-full h-10 px-3 bg-white border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-gold"
                            value={selectedBooking.caseState || "Filing/Drafting"}
                            onChange={(e) => setSelectedBooking({...selectedBooking, caseState: e.target.value})}
                          >
                            <option value="Filing/Drafting">Filing / Drafting</option>
                            <option value="Admission">Admission / Registration</option>
                            <option value="Interim Relief">Interim Relief / Stay Order</option>
                            <option value="Evidence">Evidence / Trial Stage</option>
                            <option value="Arguments">Final Arguments</option>
                            <option value="Judgment Pending">Judgment / Order Reserved</option>
                            <option value="Disposed">Disposed / Decided</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Timeline & Add Proceeding Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 border-t border-slate-100 pt-6">
                      {/* Left: Add Proceeding Form */}
                      <div className="lg:col-span-2 space-y-4 pr-0 lg:pr-6 lg:border-r lg:border-slate-100">
                        <div>
                          <h3 className="font-bold text-base mb-1 text-slate-900">Add Case Progress Event</h3>
                          <p className="text-xs text-muted-foreground mb-4">Record court hearings, orders, filings, or other track updates.</p>
                        </div>
                        
                        <form onSubmit={handleAddHistoryItem} className="space-y-4">
                          <div>
                            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1 block">Proceeding Date</label>
                            <Input 
                              type="date"
                              value={newHistoryDate}
                              onChange={(e) => setNewHistoryDate(e.target.value)}
                              className="bg-white border-slate-200"
                            />
                          </div>
                          
                          <div>
                            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1 block">Action / Event Name</label>
                            <Input 
                              placeholder="e.g. Interim Stay Extended, WS Filed"
                              value={newAction}
                              onChange={(e) => setNewAction(e.target.value)}
                              className="bg-white border-slate-200"
                            />
                          </div>

                          <div>
                            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1 block">Proceeding Details</label>
                            <Textarea 
                              placeholder="Describe what occurred in court or what was filed..."
                              value={newDescription}
                              onChange={(e) => setNewDescription(e.target.value)}
                              className="bg-white border-slate-200 resize-none h-20 text-xs"
                            />
                          </div>

                          <div>
                            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1 block">Updated By</label>
                            <select 
                              className="w-full h-9 px-3 bg-white border border-slate-200 rounded-md text-xs focus:outline-none focus:ring-1 focus:ring-gold"
                              value={newUpdatedBy}
                              onChange={(e) => setNewUpdatedBy(e.target.value)}
                            >
                              <option value="">Select Updater...</option>
                              <option value="Senior Partner">Senior Partner</option>
                              {ASSOCIATES.map((a) => (
                                <option key={a.name} value={a.name}>{a.name}</option>
                              ))}
                            </select>
                          </div>

                          <Button type="submit" variant="outline" className="w-full text-xs uppercase tracking-wider font-bold h-9 hover:bg-gold/10 hover:text-gold hover:border-gold">
                            Stage Case Update
                          </Button>
                        </form>
                      </div>

                      {/* Right: Proceedings Timeline */}
                      <div className="lg:col-span-3 space-y-4 pl-0 lg:pl-2">
                        <div className="flex justify-between items-center">
                          <h3 className="font-bold text-base text-slate-900">Case Proceedings Track Record</h3>
                          <span className="text-[10px] bg-gold/10 text-gold px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                            {selectedBooking.history?.length || 0} Events
                          </span>
                        </div>

                        {selectedBooking.history && selectedBooking.history.length > 0 ? (
                          <div className="relative pl-6 border-l border-slate-200 space-y-6 py-2 max-h-[360px] overflow-y-auto pr-2">
                            {selectedBooking.history.map((item) => (
                              <div key={item.id} className="relative group">
                                {/* Timeline Bullet */}
                                <div className="absolute -left-[31px] top-1 bg-white border-2 border-gold rounded-full w-4 h-4 flex items-center justify-center transition-transform group-hover:scale-125">
                                  <div className="bg-gold w-1.5 h-1.5 rounded-full" />
                                </div>
                                
                                <div className="bg-slate-50 hover:bg-slate-100/70 p-4 rounded-lg border border-slate-100 transition-all shadow-sm">
                                  <div className="flex flex-wrap justify-between items-start gap-2 mb-1.5">
                                    <h4 className="font-bold text-sm text-slate-800">{item.action}</h4>
                                    <span className="text-[10px] font-bold text-slate-400 whitespace-nowrap bg-white px-2 py-0.5 rounded border border-slate-100 shadow-sm">{item.date}</span>
                                  </div>
                                  <p className="text-xs text-slate-600 leading-relaxed mb-2">{item.description}</p>
                                  <div className="text-[10px] text-slate-500 flex items-center gap-1 font-medium">
                                    <Users className="w-3 h-3 text-gold/60" /> Updated by: <span className="text-slate-800 font-bold">{item.updatedBy}</span>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="py-16 text-center bg-slate-50 rounded-lg border border-dashed border-slate-200">
                            <ClipboardList className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                            <p className="text-slate-500 text-sm">No track record registered yet.</p>
                            <p className="text-slate-400 text-xs mt-1">Use the form on the left to add your first case update.</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="media" className="mt-0 space-y-6">
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <h3 className="font-bold text-lg">Case Photo & Video Gallery</h3>
                        <p className="text-xs text-muted-foreground">Upload evidence, identity proofs, or case related media.</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => handleFileClick("photo")}>
                          <ImageIcon className="w-4 h-4 mr-2" /> Add Photo
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleFileClick("video")}>
                          <Video className="w-4 h-4 mr-2" /> Add Video
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleFileClick("file")}>
                          <FileText className="w-4 h-4 mr-2" /> Add File
                        </Button>
                      </div>
                    </div>

                    <div 
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-4 rounded-xl transition-all duration-200 ${isDragging ? "bg-gold/5 border-2 border-dashed border-gold scale-[1.01]" : "bg-transparent border-2 border-transparent"}`}
                    >
                      {selectedBooking.media && selectedBooking.media.length > 0 ? (
                        <>
                          {selectedBooking.media.map((item) => (
                            <div key={item.id} className="group relative aspect-square rounded-lg bg-slate-100 overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-all">
                              {item.type === "photo" ? (
                                <img src={item.url} alt={item.title} className="w-full h-full object-cover" />
                              ) : item.type === "video" ? (
                                <div className="w-full h-full flex flex-col items-center justify-center bg-slate-900 group-hover:bg-slate-800 transition-colors">
                                  <Video className="w-8 h-8 text-gold mb-2" />
                                  <span className="text-[8px] text-white/50 uppercase tracking-widest">Video Hub</span>
                                </div>
                              ) : (
                                <div className="w-full h-full flex flex-col items-center justify-center bg-slate-50 group-hover:bg-white transition-colors">
                                  <FileText className="w-8 h-8 text-gold mb-2" />
                                  <span className="text-[8px] text-slate-400 uppercase tracking-widest">Legal File</span>
                                </div>
                              )}
                              <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
                                <p className="text-white text-[10px] font-bold truncate mb-1">{item.title}</p>
                                {item.size && <p className="text-white/50 text-[8px] mb-2">{item.size}</p>}
                                <div className="flex gap-1.5">
                                  <Button variant="secondary" size="icon" className="h-6 w-6 rounded-md bg-white/20 hover:bg-white/40 border-none text-white">
                                    <ExternalLink className="w-3 h-3" />
                                  </Button>
                                  <Button 
                                    variant="destructive" 
                                    size="icon" 
                                    className="h-6 w-6 rounded-md bg-red-500/80 hover:bg-red-500"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      const updatedMedia = selectedBooking.media?.filter(m => m.id !== item.id);
                                      setSelectedBooking({...selectedBooking, media: updatedMedia});
                                    }}
                                  >
                                    <Trash2 className="w-3 h-3" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          ))}
                          <button 
                            onClick={() => handleFileClick("file")}
                            className="aspect-square rounded-lg border-2 border-dashed border-slate-200 flex flex-col items-center justify-center gap-2 hover:border-gold hover:bg-gold/5 transition-all text-slate-400 hover:text-gold"
                          >
                            <Upload className="w-5 h-5" />
                            <span className="text-[10px] font-bold uppercase tracking-wider">Drop Hub</span>
                          </button>
                        </>
                      ) : (
                        <div 
                          className="col-span-full py-20 text-center bg-slate-50/50 border-2 border-dashed border-slate-200 rounded-xl hover:bg-gold/5 hover:border-gold transition-all"
                        >
                          <div className="relative inline-block mb-4">
                            <ImageIcon className="w-12 h-12 text-slate-200" />
                            <Plus className="w-6 h-6 text-gold absolute -right-2 -bottom-2" />
                          </div>
                          <p className="text-slate-900 font-bold text-sm mb-1 uppercase tracking-wider">Hub Gallery is Empty</p>
                          <p className="text-slate-500 text-xs mb-6 px-12">
                            Connect your drive or drag and drop files directly here. <br/>
                            We support Photos, Videos, and PDF Case Files.
                          </p>
                          <div className="flex justify-center gap-3">
                            <Button variant="gold" size="sm" onClick={() => handleFileClick("file")} className="px-6">
                              <Upload className="w-4 h-4 mr-2" /> Upload Files
                            </Button>
                            <Button variant="outline" size="sm" className="px-6">
                              <LinkIcon className="w-4 h-4 mr-2" /> Drive Link
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </TabsContent>

                  <TabsContent value="reviews" className="mt-0 space-y-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-bold text-lg">Reviews & Internal Notes</h3>
                      <Button variant="outline" size="sm" onClick={() => {
                        const newReview: CaseReview = {
                          id: Math.random().toString(36).substr(2, 9),
                          author: "Senior Counsel",
                          rating: 5,
                          comment: "Case verified and ready for initial hearing.",
                          date: new Date().toLocaleDateString()
                        };
                        setSelectedBooking({...selectedBooking, reviews: [newReview, ...(selectedBooking.reviews || [])]});
                      }}>
                        <Plus className="w-4 h-4 mr-2" /> Add Feedback
                      </Button>
                    </div>

                    <div className="space-y-4">
                      {selectedBooking.reviews && selectedBooking.reviews.length > 0 ? (
                        selectedBooking.reviews.map((review) => (
                          <Card key={review.id} className="border-slate-100 shadow-none bg-slate-50">
                            <CardContent className="p-4">
                              <div className="flex justify-between items-start mb-2">
                                <div className="flex items-center gap-2">
                                  <div className="w-8 h-8 rounded-full bg-gold flex items-center justify-center text-[10px] font-bold text-white uppercase">
                                    {review.author.substring(0, 2)}
                                  </div>
                                  <div>
                                    <h5 className="text-sm font-bold">{review.author}</h5>
                                    <p className="text-[10px] text-muted-foreground">{review.date}</p>
                                  </div>
                                </div>
                                <div className="flex text-gold">
                                  {[...Array(5)].map((_, i) => (
                                    <Star key={i} className={`w-3 h-3 ${i < review.rating ? "fill-current" : "text-slate-300"}`} />
                                  ))}
                                </div>
                              </div>
                              <p className="text-sm text-slate-600 leading-relaxed italic border-l-2 border-gold/30 pl-3">
                                "{review.comment}"
                              </p>
                            </CardContent>
                          </Card>
                        ))
                      ) : (
                        <div className="py-20 text-center bg-slate-50 border border-dashed border-slate-200 rounded-lg">
                          <MessageCircle className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                          <p className="text-slate-500 text-sm">No reviews or feedback recorded.</p>
                          <p className="text-slate-400 text-xs mt-1">Add client feedback or internal case reviews here.</p>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                </div>
              </Tabs>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* New Case / Consultation Modal */}
      <Dialog open={isNewCaseOpen} onOpenChange={setIsNewCaseOpen}>
        <DialogContent className="max-w-2xl bg-white p-8">
          <DialogHeader className="mb-4">
            <DialogTitle className="text-2xl font-heading text-slate-900">Add New Case / Consultation</DialogTitle>
            <DialogDescription className="text-slate-500">
              Initialize a new legal client consultation and case tracking record.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleCreateCase} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1 block">Client Name *</label>
                  <Input 
                    required
                    placeholder="Enter client's full name"
                    value={newClient}
                    onChange={(e) => setNewClient(e.target.value)}
                    className="bg-slate-50 border-slate-200"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1 block">Phone</label>
                    <Input 
                      placeholder="Phone number"
                      value={newPhone}
                      onChange={(e) => setNewPhone(e.target.value)}
                      className="bg-slate-50 border-slate-200"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1 block">Email *</label>
                    <Input 
                      required
                      type="email"
                      placeholder="Email address"
                      value={newEmail}
                      onChange={(e) => setNewEmail(e.target.value)}
                      className="bg-slate-50 border-slate-200"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1 block">Case Subject / Title *</label>
                  <Input 
                    required
                    placeholder="e.g. Property Title Dispute, Bail Application"
                    value={newSubject}
                    onChange={(e) => setNewSubject(e.target.value)}
                    className="bg-slate-50 border-slate-200"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1 block">Brief Case Details</label>
                  <Textarea 
                    placeholder="Enter brief description of the legal dispute or consultation notes..."
                    value={newCaseDescription}
                    onChange={(e) => setNewCaseDescription(e.target.value)}
                    className="bg-slate-50 border-slate-200 resize-none h-[120px]"
                  />
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1 block">Case Number / Citation</label>
                  <Input 
                    placeholder="e.g. WP 8492/2026"
                    value={newCaseNumber}
                    onChange={(e) => setNewCaseNumber(e.target.value)}
                    className="bg-slate-50 border-slate-200"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1 block">Court Forum</label>
                  <Input 
                    placeholder="e.g. High Court of Karnataka"
                    value={newCourtName}
                    onChange={(e) => setNewCourtName(e.target.value)}
                    className="bg-slate-50 border-slate-200"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1 block">Assigned Associate</label>
                  <select 
                    className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-gold"
                    value={newAssignedAssociate}
                    onChange={(e) => setNewAssignedAssociate(e.target.value)}
                  >
                    <option value="">Select Associate...</option>
                    {ASSOCIATES.map((a) => (
                      <option key={a.name} value={a.name}>{a.name}</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1 block">Case Stage</label>
                    <select 
                      className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-gold"
                      value={newCaseState}
                      onChange={(e) => setNewCaseState(e.target.value)}
                    >
                      <option value="Filing/Drafting">Filing / Drafting</option>
                      <option value="Admission">Admission</option>
                      <option value="Interim Relief">Interim Relief</option>
                      <option value="Evidence">Evidence / Trial</option>
                      <option value="Arguments">Arguments</option>
                      <option value="Judgment Pending">Judgment Pending</option>
                      <option value="Disposed">Disposed</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1 block">Inquiry Status</label>
                    <select 
                      className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-gold"
                      value={newStatus}
                      onChange={(e) => setNewStatus(e.target.value as any)}
                    >
                      <option value="Pending">Pending Review</option>
                      <option value="Confirmed">Active Consultation</option>
                      <option value="Completed">Case Closed</option>
                      <option value="Cancelled">Inquiry Dropped</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 border-t border-slate-100 pt-4 mt-6">
              <Button type="button" variant="outline" onClick={() => setIsNewCaseOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="gold">
                Create Case File
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Change Password Modal */}
      <Dialog open={isChangePasswordOpen} onOpenChange={setIsChangePasswordOpen}>
        <DialogContent className="max-w-md bg-white p-8">
          <DialogHeader className="mb-4">
            <DialogTitle className="text-2xl font-heading text-slate-900">Change Admin Password</DialogTitle>
            <DialogDescription className="text-slate-500">
              Update the security key used to access the administrator console across all devices.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleChangePasswordSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1 block">Current Password *</label>
              <Input 
                required
                type="password"
                placeholder="Enter current password"
                value={currentPasswordInput}
                onChange={(e) => setCurrentPasswordInput(e.target.value)}
                className="bg-slate-50 border-slate-200"
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1 block">New Password *</label>
              <Input 
                required
                type="password"
                placeholder="Enter new password"
                value={newPasswordInput}
                onChange={(e) => setNewPasswordInput(e.target.value)}
                className="bg-slate-50 border-slate-200"
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1 block">Confirm New Password *</label>
              <Input 
                required
                type="password"
                placeholder="Confirm new password"
                value={confirmPasswordInput}
                onChange={(e) => setConfirmPasswordInput(e.target.value)}
                className="bg-slate-50 border-slate-200"
              />
            </div>

            <div className="flex justify-end gap-3 border-t border-slate-100 pt-4 mt-6">
              <Button type="button" variant="outline" onClick={() => setIsChangePasswordOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="gold">
                Update Password
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard;
