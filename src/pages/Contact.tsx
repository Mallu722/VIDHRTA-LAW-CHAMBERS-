import { useState, FormEvent } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import SectionHeading from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock, CalendarCheck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { saveBooking } from "@/lib/storage";

const Contact = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    client: "",
    phone: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API delay
    setTimeout(() => {
      saveBooking(formData);
      setLoading(false);
      toast({
        title: "Booking Inquiry Sent",
        description: "Thank you for reaching out. We have received your booking inquiry and will get back to you shortly.",
      });
      setFormData({
        client: "",
        phone: "",
        email: "",
        subject: "",
        message: ""
      });
      (e.target as HTMLFormElement).reset();
    }, 1000);
  };

  return (
    <div>
      <section className="bg-primary pt-32 pb-20">
        <div className="container-wide section-padding">
          <ScrollReveal>
            <span className="text-gold text-xs tracking-[0.4em] uppercase font-semibold mb-4 block">Booking</span>
            <h1 className="text-primary-foreground max-w-3xl">Book an Appointment</h1>
            <p className="text-primary-foreground/65 text-lg mt-4 max-w-2xl">
              Schedule a consultation or send us your booking inquiry. We respond within one business day.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="container-wide section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
            {/* Contact Info */}
            <div className="lg:col-span-2">
              <ScrollReveal direction="left">
                <SectionHeading eyebrow="Office" title="Visit Us" align="left" />
                <div className="space-y-6 mb-10">
                  <div className="flex gap-4">
                    <MapPin className="w-5 h-5 text-gold shrink-0 mt-1" />
                    <div>
                      <h4 className="font-heading text-lg font-semibold text-foreground mb-1">Address</h4>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        No. 111 & 114, Embassy Centre<br />
                        Race Course Road / Crescent Road<br />
                        Bengaluru – 560001, Karnataka
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Phone className="w-5 h-5 text-gold shrink-0" />
                    <div>
                      <h4 className="font-heading text-lg font-semibold text-foreground mb-1">Phone</h4>
                      <p className="text-muted-foreground text-sm">+91 80 XXXX XXXX</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Mail className="w-5 h-5 text-gold shrink-0" />
                    <div>
                      <h4 className="font-heading text-lg font-semibold text-foreground mb-1">Email</h4>
                      <p className="text-muted-foreground text-sm">contact@vidhrtalaw.com</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Clock className="w-5 h-5 text-gold shrink-0" />
                    <div>
                      <h4 className="font-heading text-lg font-semibold text-foreground mb-1">Office Hours</h4>
                      <p className="text-muted-foreground text-sm">Mon – Sat: 9:30 AM – 6:30 PM</p>
                    </div>
                  </div>
                </div>

                {/* Map */}
                <div className="rounded overflow-hidden border border-border">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.8!2d77.585!3d12.985!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDU5JzA2LjAiTiA3N8KwMzUnMDYuMCJF!5e0!3m2!1sen!2sin!4v1600000000000"
                    width="100%"
                    height="250"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Vidhrta Law Chambers Location"
                  />
                </div>
              </ScrollReveal>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3">
              <ScrollReveal direction="right">
                <SectionHeading eyebrow="Inquiry" title="Book an Inquiry" align="left" />
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="text-xs tracking-wider uppercase text-muted-foreground font-medium mb-2 block">Full Name *</label>
                      <Input
                        name="client"
                        required
                        placeholder="Your full name"
                        className="bg-card"
                        value={formData.client}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <label className="text-xs tracking-wider uppercase text-muted-foreground font-medium mb-2 block">Phone</label>
                      <Input
                        name="phone"
                        type="tel"
                        placeholder="+91 XXXXX XXXXX"
                        className="bg-card"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs tracking-wider uppercase text-muted-foreground font-medium mb-2 block">Email *</label>
                    <Input
                      name="email"
                      required
                      type="email"
                      placeholder="your@email.com"
                      className="bg-card"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="text-xs tracking-wider uppercase text-muted-foreground font-medium mb-2 block">Subject</label>
                    <Input
                      name="subject"
                      placeholder="Brief subject of your booking inquiry"
                      className="bg-card"
                      value={formData.subject}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="text-xs tracking-wider uppercase text-muted-foreground font-medium mb-2 block">Message *</label>
                    <Textarea
                      name="message"
                      required
                      rows={6}
                      placeholder="Describe your legal matter or inquiry..."
                      className="bg-card resize-none"
                      value={formData.message}
                      onChange={handleChange}
                    />
                  </div>
                  <Button type="submit" variant="gold" size="lg" disabled={loading}>
                    {loading ? "Processing..." : <>Book Now <CalendarCheck className="w-4 h-4 ml-2" /></>}
                  </Button>
                  <p className="text-xs text-muted-foreground mt-2">
                    All communications are treated as confidential. We typically respond within one business day.
                  </p>
                </form>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
