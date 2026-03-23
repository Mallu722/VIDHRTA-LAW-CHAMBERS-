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
  Link as LinkIcon
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
import { getBookings, updateBooking, Booking, CaseMedia, CaseReview } from "@/lib/storage";
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

  useEffect(() => {
    setBookings(getBookings());
  }, []);

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
                <Button variant="outline" className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10">
                  <Download className="w-4 h-4 mr-2" /> Export Report
                </Button>
                <Button variant="gold">
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

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Bookings Table */}
            <div className="lg:col-span-2 space-y-6">
              <ScrollReveal>
                <Card className="border-none shadow-sm">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-7">
                    <div>
                      <CardTitle className="text-xl font-bold">Recent Bookings</CardTitle>
                      <CardDescription>Manage your incoming booking inquiries</CardDescription>
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
                            <th className="pb-4 font-semibold text-slate-900">Client</th>
                            <th className="pb-4 font-semibold text-slate-900">Subject</th>
                            <th className="pb-4 font-semibold text-slate-900">Date/Status</th>
                            <th className="pb-4 font-semibold text-slate-900 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                          {filteredBookings.map((booking) => (
                            <tr key={booking.id} className="group hover:bg-slate-50 transition-colors cursor-pointer" onClick={() => { setSelectedBooking({ ...booking }); setIsModalOpen(true); }}>
                              <td className="py-4">
                                <div className="font-medium text-slate-900">{booking.client}</div>
                                <div className="text-xs text-muted-foreground">{booking.email}</div>
                              </td>
                              <td className="py-4 text-slate-600 max-w-[150px] truncate">{booking.subject || "No Subject"}</td>
                              <td className="py-4">
                                <div className="text-slate-600 mb-1">{booking.date}</div>
                                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium border ${getStatusColor(booking.status)}`}>
                                  {booking.status}
                                </span>
                              </td>
                              <td className="py-4 text-right">
                                <Button variant="ghost" size="sm" className="h-8 px-2 text-gold hover:text-gold hover:bg-gold/10">
                                  Manage Hub <ExternalLink className="w-3 h-3 ml-1.5" />
                                </Button>
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

            {/* Upcoming Schedule */}
            <div className="space-y-6">
              <ScrollReveal direction="right">
                <Card className="border-none shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-gold" /> Upcoming Schedule
                    </CardTitle>
                    <CardDescription>Your appointments for the next 48 hours</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="py-8 text-center bg-slate-50/50 rounded-lg border border-dashed border-slate-200">
                      <p className="text-sm text-muted-foreground leading-relaxed px-6">
                        No scheduled appointments found for the next 48 hours.
                      </p>
                    </div>
                    <Button variant="outline" className="w-full mt-4">View Full Calendar</Button>
                  </CardContent>
                </Card>
              </ScrollReveal>

              <ScrollReveal direction="right" delay={100}>
                <Card className="bg-primary border-none shadow-sm text-primary-foreground text-center py-8">
                  <CardContent className="space-y-4">
                    <BarChart3 className="w-8 h-8 text-gold mx-auto mb-2 opacity-50" />
                    <h3 className="font-bold">Case Analytics</h3>
                    <p className="text-xs text-primary-foreground/60 px-4">
                      Analytics will be available once case data starts accumulating in the system.
                    </p>
                  </CardContent>
                </Card>
              </ScrollReveal>
            </div>
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
    </div>
  );
};

export default Dashboard;
