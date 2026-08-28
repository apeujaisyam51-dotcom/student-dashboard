import { useState, useEffect, useRef } from 'react';
import { 
  LayoutDashboard, Users, BookOpen, CalendarCheck, Award, Bell, Sparkles, Search, CheckCircle, AlertCircle, Info, X, Menu, Plus, Trash2, UserCheck, GraduationCap, ChevronRight 
} from 'lucide-react';

const BS_PROGRAMS = [
  'BS Computer Science',
  'BS Artificial Intelligence',
  'BS Information Technology',
  'BS English',
  'BS Commerce',
  'BS Islamiat',
  'BS Urdu'
];

const PROGRAM_COURSES = {
  'BS Computer Science': {
    'Semester 1': [{ id: 'CS-101', title: 'Programming Fundamentals', instructor: 'Dr. Aris', progress: 85 }, { id: 'CS-102', title: 'Applied Physics', instructor: 'Prof. Tariq', progress: 75 }],
    'Semester 2': [{ id: 'CS-201', title: 'Object Oriented Programming', instructor: 'Engr. Usman', progress: 90 }, { id: 'CS-202', title: 'Data Structures', instructor: 'Dr. Bilal', progress: 80 }],
    'Semester 3': [{ id: 'CS-301', title: 'Database Systems', instructor: 'Prof. Sarah', progress: 70 }, { id: 'CS-302', title: 'Operating Systems', instructor: 'Ms. Hira', progress: 88 }],
    'Semester 4': [{ id: 'CS-401', title: 'Software Engineering', instructor: 'Dr. Hamza', progress: 92 }]
  },
  'BS Artificial Intelligence': {
    'Semester 1': [{ id: 'AI-101', title: 'Intro to AI & Logic', instructor: 'Dr. Zeeshan', progress: 88 }, { id: 'AI-102', title: 'Linear Algebra', instructor: 'Prof. Akram', progress: 79 }],
    'Semester 2': [{ id: 'AI-201', title: 'Python for Data Science', instructor: 'Ms. Sana', progress: 94 }, { id: 'AI-202', title: 'Probability & Statistics', instructor: 'Dr. Noman', progress: 81 }],
    'Semester 3': [{ id: 'AI-301', title: 'Machine Learning Basics', instructor: 'Dr. Aris', progress: 85 }, { id: 'AI-302', title: 'Neural Networks', instructor: 'Prof. Sarah', progress: 77 }],
    'Semester 4': [{ id: 'AI-401', title: 'Deep Learning & CV', instructor: 'Dr. Bilal', progress: 90 }]
  },
  'BS Information Technology': {
    'Semester 1': [{ id: 'IT-101', title: 'ICT & Computing', instructor: 'Mr. Adnan', progress: 80 }, { id: 'IT-102', title: 'Basic Electronics', instructor: 'Engr. Fawad', progress: 70 }],
    'Semester 2': [{ id: 'IT-201', title: 'Web Systems & Technologies', instructor: 'Ms. Ayesha', progress: 89 }, { id: 'IT-202', title: 'Computer Networks', instructor: 'Prof. Tariq', progress: 83 }],
    'Semester 3': [{ id: 'IT-301', title: 'System Administration', instructor: 'Mr. Salman', progress: 76 }, { id: 'IT-302', title: 'Cloud Infrastructure', instructor: 'Engr. Hamza', progress: 84 }],
    'Semester 4': [{ id: 'IT-401', title: 'Information Security', instructor: 'Dr. Zeeshan', progress: 91 }]
  },
  'BS English': {
    'Semester 1': [{ id: 'ENG-101', title: 'English Grammar & Composition', instructor: 'Dr. Bushra', progress: 90 }, { id: 'ENG-102', title: 'Introduction to Linguistics', instructor: 'Prof. Jamil', progress: 82 }],
    'Semester 2': [{ id: 'ENG-201', title: 'Classical Poetry', instructor: 'Ms. Farhat', progress: 85 }, { id: 'ENG-202', title: 'Phonetics & Phonology', instructor: 'Dr. Bushra', progress: 78 }],
    'Semester 3': [{ id: 'ENG-301', title: 'Drama & Novel', instructor: 'Prof. Jamil', progress: 88 }, { id: 'ENG-302', title: 'Literary Criticism', instructor: 'Ms. Farhat', progress: 80 }],
    'Semester 4': [{ id: 'ENG-401', title: 'American Literature', instructor: 'Dr. Aslam', progress: 95 }]
  },
  'BS Commerce': {
    'Semester 1': [{ id: 'COM-101', title: 'Financial Accounting I', instructor: 'Mr. Kashif', progress: 84 }, { id: 'COM-102', title: 'Business Economics', instructor: 'Dr. Mehmood', progress: 76 }],
    'Semester 2': [{ id: 'COM-201', title: 'Financial Accounting II', instructor: 'Mr. Kashif', progress: 88 }, { id: 'COM-202', title: 'Business Mathematics', instructor: 'Ms. Nadia', progress: 82 }],
    'Semester 3': [{ id: 'COM-301', title: 'Cost Accounting', instructor: 'Dr. Mehmood', progress: 79 }, { id: 'COM-302', title: 'Business Law', instructor: 'Advocate Ali', progress: 85 }],
    'Semester 4': [{ id: 'COM-401', title: 'Auditing & Taxation', instructor: 'Mr. Kashif', progress: 93 }]
  },
  'BS Islamiat': {
    'Semester 1': [{ id: 'ISL-101', title: 'Quranic Studies (Tafseer)', instructor: 'Dr. Qari Ahmed', progress: 92 }, { id: 'ISL-102', title: 'Arabic Grammar I', instructor: 'Mufti Ismail', progress: 85 }],
    'Semester 2': [{ id: 'ISL-201', title: 'Hadith Studies', instructor: 'Dr. Qari Ahmed', progress: 89 }, { id: 'ISL-202', title: 'Islamic Jurisprudence (Fiqh)', instructor: 'Mufti Ismail', progress: 83 }],
    'Semester 3': [{ id: 'ISL-301', title: 'Comparative Religions', instructor: 'Dr. Rauf', progress: 81 }, { id: 'ISL-302', title: 'Islamic History', instructor: 'Dr. Qari Ahmed', progress: 87 }],
    'Semester 4': [{ id: 'ISL-401', title: 'Islamic Ethics & Philosophy', instructor: 'Dr. Rauf', progress: 94 }]
  },
  'BS Urdu': {
    'Semester 1': [{ id: 'URD-101', title: 'Urdu Zaban-o-Adab ki Tareekh', instructor: 'Dr. Anjum', progress: 88 }, { id: 'URD-102', title: 'Classical Ghazal', instructor: 'Prof. Tanveer', progress: 80 }],
    'Semester 2': [{ id: 'URD-201', title: 'Urdu Afsana aur Novel', instructor: 'Dr. Anjum', progress: 86 }, { id: 'URD-202', title: 'Qaseeda aur Marsiya', instructor: 'Prof. Tanveer', progress: 82 }],
    'Semester 3': [{ id: 'URD-301', title: 'Iqbaliyat', instructor: 'Dr. Waheed', progress: 91 }, { id: 'URD-302', title: 'Tanqeed-o-Tajziya', instructor: 'Dr. Anjum', progress: 79 }],
    'Semester 4': [{ id: 'URD-401', title: 'Jadeed Urdu Nazm', instructor: 'Dr. Waheed', progress: 95 }]
  }
};

const generateStudents = () => {
  const firstNames = [
    'Ahmad', 'Sara', 'Zaid', 'Ayesha', 'Bilal', 'Hamza', 'Fatima', 'Usman', 'Zainab', 'Omer', 
    'Ali', 'Hena', 'Tariq', 'Maryam', 'Danish', 'Sania', 'Fawad', 'Mahira', 'Atif', 'Iqra', 
    'Yasir', 'Asim', 'Hania', 'Farhan', 'Urwa', 'Mawra', 'Imran', 'Sajal', 'Ahad', 'Yumna',
    'Rehan', 'Nida', 'Kashif', 'Sana', 'Waqas', 'Hira', 'Zeeshan', 'Rabia', 'Adnan', 'Mehwish',
    'Talha', 'Amna', 'Ahsan', 'Kinza', 'Saad', 'Sidra', 'Fahad', 'Anum', 'Bilal', 'Laiba'
  ];
  
  const lastNames = [
    'Khan', 'Ali', 'Sheikh', 'Omer', 'Hassan', 'Malik', 'Noor', 'Ghani', 'Raza', 'Farooq', 
    'Parvez', 'Jameel', 'Nawaz', 'Taimoor', 'Mirza', 'Aslam', 'Aziz', 'Hussain', 'Azhar', 'Aamir'
  ];
  
  let list = [];
  let idCounter = 1001;

  BS_PROGRAMS.forEach((prog, pIndex) => {
    for (let i = 1; i <= 30; i++) {
      const fNameIndex = (pIndex * 31 + i) % firstNames.length;
      const lNameIndex = (pIndex * 17 + i * 3) % lastNames.length;
      
      const fName = firstNames[fNameIndex];
      const lName = lastNames[lNameIndex];
      
      const semesters = ['Semester 1', 'Semester 2', 'Semester 3', 'Semester 4'];
      const sem = semesters[(i + pIndex) % semesters.length];
      
      const attendances = ['Present', 'Present', 'Present', 'Absent', 'Present'];
      const att = attendances[(i * pIndex + 2) % attendances.length];
      
      const gpas = ['3.2', '3.5', '3.8', '2.9', '3.9', '3.1', '3.6', '3.4', '3.7', '3.0', '3.3', '3.85'];
      const gpa = gpas[(i + pIndex) % gpas.length];
      
      const grades = ['A+', 'A', 'B+', 'B', 'A', 'A+', 'B', 'A-'];
      const grade = grades[(i * 2 + pIndex) % grades.length];

      list.push({
        id: `STD-${idCounter++}`,
        name: `${fName} ${lName}`,
        email: `${fName.toLowerCase()}.${lName.toLowerCase()}${i}@example.com`,
        program: prog,
        semester: sem,
        attendance: att,
        gpa: gpa,
        grade: grade
      });
    }
  });
  return list;
};

const NOTIFICATIONS = [
  { id: 1, title: 'Exam Schedule Released', desc: 'Midterm date sheet for Spring semester has been published.', time: '10m ago', type: 'info' },
  { id: 2, title: 'Attendance Alert', desc: 'Attendance updated for BS Artificial Intelligence.', time: '1h ago', type: 'success' },
  { id: 3, title: 'System Upgrade', desc: 'Engine updated to v2.4 successfully.', time: '3h ago', type: 'warning' },
];

export default function StudentDashboard() {
  const [students, setStudents] = useState(() => generateStudents());
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProgram, setSelectedProgram] = useState('BS Computer Science');
  const [selectedSemester, setSelectedSemester] = useState('Semester 1');
  
  // Student Detail Modal & Add Modal States
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newStudent, setNewStudent] = useState({
    name: '',
    email: '',
    program: 'BS Computer Science',
    semester: 'Semester 1',
    attendance: 'Present',
    gpa: '3.5',
    grade: 'A'
  });

  // Mobile Drawer State
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Notification States
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(3);
  const notifRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Remove Student Function
  const handleRemoveStudent = (id, e) => {
    if (e) e.stopPropagation();
    if (window.confirm("remove student?")) {
      setStudents(prev => prev.filter(s => s.id !== id));
      if (selectedStudent && selectedStudent.id === id) {
        setSelectedStudent(null);
      }
    }
  };

  // Add Student Form Submission
  const handleAddStudentSubmit = (e) => {
    e.preventDefault();
    if (!newStudent.name || !newStudent.email) return;

    const newId = `STD-${Date.now().toString().slice(-4)}`;
    const studentToAdd = { ...newStudent, id: newId };
    
    setStudents([studentToAdd, ...students]);
    setShowAddModal(false);
    
    // Reset form
    setNewStudent({
      name: '',
      email: '',
      program: selectedProgram,
      semester: 'Semester 1',
      attendance: 'Present',
      gpa: '3.5',
      grade: 'A'
    });
  };

  const filteredStudents = students.filter(s => {
    const matchSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) || s.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchProg = s.program === selectedProgram;
    return matchSearch && matchProg;
  });

  return (
    // Focus Mint Palette: Main BG #F4F7F6, Dark #1A2E26, Accent Mint #00A86B, Card BG #FFFFFF
    <div className="flex min-h-screen bg-[#F4F7F6] text-[#1A2E26] font-sans selection:bg-[#00A86B] selection:text-white overflow-x-hidden">

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div 
          onClick={() => setMobileMenuOpen(false)} 
          className="fixed inset-0 bg-[#1A2E26]/50 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      {/* Sidebar Navigation */}
      <aside className={`fixed lg:static inset-y-0 left-0 w-64 bg-[#FFFFFF] border-r border-[#E2E8F0] p-6 flex flex-col justify-between z-50 transition-transform duration-300 transform ${
        mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        <div>
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-[#00A86B] rounded-xl text-white font-black shadow-md">
                <GraduationCap className="w-5 h-5" />
              </div>
              <h1 className="text-xl font-bold text-[#1A2E26]">Student</h1>
            </div>
            <button onClick={() => setMobileMenuOpen(false)} className="lg:hidden text-[#1A2E26]/60 hover:text-[#1A2E26] p-1">
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="space-y-1.5">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
              { id: 'students', label: 'Students List', icon: Users },
              { id: 'courses', label: 'Courses & Programs', icon: BookOpen },
              { id: 'attendance', label: 'Attendance', icon: CalendarCheck },
              { id: 'results', label: 'Results & GPA', icon: Award }
            ].map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-semibold text-sm ${
                    isActive 
                      ? 'bg-[#1A2E26] text-white shadow-sm' 
                      : 'text-[#1A2E26]/70 hover:bg-[#F4F7F6] hover:text-[#1A2E26]'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-4 sm:p-8 overflow-y-auto min-w-0">
        
        {/* Top Header */}
        <header className="flex justify-between items-center mb-8 relative gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setMobileMenuOpen(true)} 
              className="lg:hidden p-2.5 bg-[#FFFFFF] border border-[#E2E8F0] rounded-xl text-[#00A86B]"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div>
  <h2 className="text-xl sm:text-3xl font-bold capitalize tracking-tight text-[#1A2E26] truncate">
    Welcome back, Admin! 👋
  </h2>
  <p className="text-[#1A2E26]/60 text-xs sm:text-sm mt-0.5">
    Here is an overview of student performance & department records.
  </p>
</div>
          </div>

          <div className="flex items-center gap-3">
            {/* Add Student Button */}
            <button 
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 bg-[#00A86B] hover:bg-[#008f5a] text-white px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-sm transition"
            >
              <Plus className="w-4 h-4" /> Add New Student
            </button>

            {/* Notification Bell */}
            <div className="relative shrink-0" ref={notifRef}>
              <button 
                onClick={() => {
                  setShowNotifications(!showNotifications);
                  setUnreadCount(0);
                }}
                className="p-3 bg-[#FFFFFF] border border-[#E2E8F0] rounded-xl text-[#1A2E26] hover:border-[#00A86B] transition relative"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#00A86B] text-white font-bold text-[10px] flex items-center justify-center rounded-full">
                    {unreadCount}
                  </span>
                )}
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-3 w-72 sm:w-80 bg-[#FFFFFF] border border-[#E2E8F0] rounded-2xl shadow-xl p-4 z-50 space-y-3">
                  <div className="flex justify-between items-center border-b border-[#E2E8F0] pb-2">
                    <h4 className="font-bold text-sm text-[#1A2E26] flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#00A86B]" /> Notifications
                    </h4>
                    <button onClick={() => setShowNotifications(false)} className="text-[#1A2E26]/60 hover:text-[#1A2E26]">
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                    {NOTIFICATIONS.map((n) => (
                      <div key={n.id} className="p-3 rounded-xl bg-[#F4F7F6] border border-[#E2E8F0] flex gap-3 items-start">
                        {n.type === 'info' && <Info className="w-4 h-4 text-[#00A86B] mt-0.5 shrink-0" />}
                        {n.type === 'success' && <CheckCircle className="w-4 h-4 text-[#00A86B] mt-0.5 shrink-0" />}
                        {n.type === 'warning' && <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />}
                        <div className="flex-1">
                          <div className="flex justify-between text-xs font-bold text-[#1A2E26]">
                            <span>{n.title}</span>
                            <span className="text-[10px] text-[#1A2E26]/50 font-mono">{n.time}</span>
                          </div>
                          <p className="text-xs text-[#1A2E26]/60 mt-1 leading-snug">{n.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Dashboard Overview Tab */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <div className="bg-[#FFFFFF] p-6 rounded-2xl border border-[#E2E8F0] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-l-4 border-l-[#00A86B] shadow-sm">
              <div className="flex items-center gap-4">
                <div className="p-3.5 bg-[#00A86B]/10 rounded-xl text-[#00A86B] shrink-0">
                  <UserCheck className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider font-bold text-[#00A86B]">System Overview</div>
                  <div className="text-sm text-[#1A2E26] font-medium mt-1">Total {students.length} active students synced across 7 BS Programs & 4 Semesters.</div>
                </div>
              </div>
            </div>

            {/* Clickable Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
              
              {/* Card 1: Major Subjects (Clickable to Courses) */}
              <div 
                onClick={() => setActiveTab('courses')}
                className="bg-[#FFFFFF] p-6 rounded-2xl border border-[#E2E8F0] hover:border-[#00A86B] shadow-sm hover:shadow-md transition cursor-pointer group"
              >
                <div className="flex justify-between items-center text-xs text-[#1A2E26]/60 font-bold">
                  <span>Major Subjects</span>
                  <ChevronRight className="w-4 h-4 text-[#00A86B] group-hover:translate-x-1 transition" />
                </div>
                <div className="text-3xl font-extrabold mt-3 text-[#1A2E26] group-hover:text-[#00A86B] transition">7 BS Majors</div>
                <p className="text-xs text-[#00A86B] font-semibold mt-2">Click to view all subjects & courses →</p>
              </div>

              {/* Card 2: Active Students (Clickable to Students List) */}
              <div 
                onClick={() => setActiveTab('students')}
                className="bg-[#FFFFFF] p-6 rounded-2xl border border-[#E2E8F0] hover:border-[#00A86B] shadow-sm hover:shadow-md transition cursor-pointer group"
              >
                <div className="flex justify-between items-center text-xs text-[#1A2E26]/60 font-bold">
                  <span>Active Students</span>
                  <ChevronRight className="w-4 h-4 text-[#00A86B] group-hover:translate-x-1 transition" />
                </div>
                <div className="text-3xl font-extrabold mt-3 text-[#1A2E26] group-hover:text-[#00A86B] transition">{students.length} Total</div>
                <p className="text-xs text-[#00A86B] font-semibold mt-2">Click to manage all student records →</p>
              </div>

              {/* Card 3: Average Percentage (Clickable to Attendance) */}
              <div 
                onClick={() => setActiveTab('attendance')}
                className="bg-[#FFFFFF] p-6 rounded-2xl border border-[#E2E8F0] hover:border-[#00A86B] shadow-sm hover:shadow-md transition cursor-pointer group"
              >
                <div className="flex justify-between items-center text-xs text-[#1A2E26]/60 font-bold">
                  <span>Average Percentage</span>
                  <ChevronRight className="w-4 h-4 text-[#00A86B] group-hover:translate-x-1 transition" />
                </div>
                <div className="text-3xl font-extrabold mt-3 text-[#00A86B]">85%</div>
                <p className="text-xs text-[#1A2E26]/60 font-semibold mt-2">Attendance & Performance Sync</p>
              </div>

            </div>
          </div>
        )}

        {/* Department Switcher */}
        {(activeTab === 'students' || activeTab === 'attendance' || activeTab === 'results') && (
          <div className="mb-6 flex gap-2 flex-wrap bg-[#FFFFFF] p-3 rounded-2xl border border-[#E2E8F0]">
            {BS_PROGRAMS.map((prog) => (
              <button
                key={prog}
                onClick={() => setSelectedProgram(prog)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedProgram === prog 
                    ? 'bg-[#00A86B] text-white shadow-sm' 
                    : 'text-[#1A2E26]/70 hover:text-[#1A2E26] bg-[#F4F7F6]'
                }`}
              >
                {prog}
              </button>
            ))}
          </div>
        )}

        {/* Students List Tab */}
        {activeTab === 'students' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div className="flex items-center bg-[#FFFFFF] border border-[#E2E8F0] px-4 py-2 rounded-xl w-full sm:w-72">
                <Search className="w-4 h-4 text-[#00A86B] mr-2 shrink-0" />
                <input 
                  type="text" 
                  placeholder={`Search in ${selectedProgram}...`} 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-transparent text-sm text-[#1A2E26] outline-none w-full placeholder-[#1A2E26]/40"
                />
              </div>
              <span className="text-xs text-[#00A86B] font-mono font-bold">Showing {filteredStudents.length} Students for {selectedProgram}</span>
            </div>

            <div className="bg-[#FFFFFF] border border-[#E2E8F0] rounded-2xl overflow-x-auto shadow-sm">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-[#F4F7F6] text-[#1A2E26]/60 border-b border-[#E2E8F0]">
                  <tr>
                    <th className="p-4">ID</th>
                    <th className="p-4">Name</th>
                    <th className="p-4">Email</th>
                    <th className="p-4">Semester</th>
                    <th className="p-4">GPA</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2E8F0]">
                  {filteredStudents.map((std) => (
                    <tr 
                      key={std.id} 
                      onClick={() => setSelectedStudent(std)}
                      className="hover:bg-[#F4F7F6] transition-colors cursor-pointer"
                    >
                      <td className="p-4 font-mono text-xs text-[#00A86B] font-bold">{std.id}</td>
                      <td className="p-4 font-bold text-[#1A2E26]">{std.name}</td>
                      <td className="p-4 text-[#1A2E26]/60 text-xs">{std.email}</td>
                      <td className="p-4 text-[#1A2E26] text-xs font-semibold">{std.semester}</td>
                      <td className="p-4 font-mono font-bold text-[#00A86B]">{std.gpa}</td>
                      <td className="p-4 text-right">
                        <button 
                          onClick={(e) => handleRemoveStudent(std.id, e)}
                          className="bg-red-50 hover:bg-red-100 text-red-600 p-2 rounded-lg transition border border-red-200"
                          title="Remove Student"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Courses & Programs Tab */}
        {activeTab === 'courses' && (
          <div className="space-y-6">
            <div className="flex gap-2 flex-wrap">
              {BS_PROGRAMS.map((prog) => (
                <button
                  key={prog}
                  onClick={() => setSelectedProgram(prog)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    selectedProgram === prog 
                      ? 'bg-[#1A2E26] text-white shadow-sm' 
                      : 'bg-[#FFFFFF] border border-[#E2E8F0] text-[#1A2E26]/70 hover:text-[#1A2E26]'
                  }`}
                >
                  {prog}
                </button>
              ))}
            </div>

            <div className="flex gap-3 border-b border-[#E2E8F0] pb-3 overflow-x-auto">
              {['Semester 1', 'Semester 2', 'Semester 3', 'Semester 4'].map((sem) => (
                <button
                  key={sem}
                  onClick={() => setSelectedSemester(sem)}
                  className={`px-4 py-1.5 rounded-lg text-xs font-semibold shrink-0 transition ${
                    selectedSemester === sem ? 'bg-[#00A86B] text-white' : 'text-[#1A2E26]/60 hover:bg-[#F4F7F6]'
                  }`}
                >
                  {sem}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {PROGRAM_COURSES[selectedProgram]?.[selectedSemester]?.map((course, idx) => (
                <div key={idx} className="bg-[#FFFFFF] border border-[#E2E8F0] p-6 rounded-2xl space-y-4 shadow-sm">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-xs font-mono text-[#00A86B] bg-[#00A86B]/10 px-2.5 py-1 rounded-md font-bold">{course.id}</span>
                      <h3 className="text-lg font-bold mt-2 text-[#1A2E26]">{course.title}</h3>
                      <p className="text-xs text-[#1A2E26]/60 mt-1">Instructor: {course.instructor}</p>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-[#1A2E26]/60">Course Progress</span>
                      <span className="text-[#00A86B] font-bold">{course.progress}%</span>
                    </div>
                    <div className="w-full bg-[#F4F7F6] h-2.5 rounded-full overflow-hidden border border-[#E2E8F0]">
                      <div className="bg-[#00A86B] h-full rounded-full" style={{ width: `${course.progress}%` }}></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Attendance Tab */}
        {activeTab === 'attendance' && (
          <div className="bg-[#FFFFFF] border border-[#E2E8F0] rounded-2xl overflow-x-auto shadow-sm">
            <div className="p-4 bg-[#F4F7F6] border-b border-[#E2E8F0] font-bold text-sm text-[#00A86B] whitespace-nowrap">
              Attendance Register for {selectedProgram} ({filteredStudents.length} Students)
            </div>
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-[#F4F7F6] text-[#1A2E26]/60 border-b border-[#E2E8F0]">
                <tr>
                  <th className="p-4">ID</th>
                  <th className="p-4">Student Name</th>
                  <th className="p-4">Semester</th>
                  <th className="p-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E8F0]">
                {filteredStudents.map((row) => (
                  <tr key={row.id} onClick={() => setSelectedStudent(row)} className="hover:bg-[#F4F7F6] transition-colors cursor-pointer">
                    <td className="p-4 font-mono text-xs text-[#00A86B] font-bold">{row.id}</td>
                    <td className="p-4 font-bold text-[#1A2E26]">{row.name}</td>
                    <td className="p-4 text-[#1A2E26]/60 text-xs">{row.semester}</td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-black ${
                        row.attendance === 'Present' 
                          ? 'bg-[#00A86B]/10 text-[#00A86B]' 
                          : 'bg-red-50 text-red-600 border border-red-200'
                      }`}>
                        {row.attendance}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Results & GPA Tab */}
        {activeTab === 'results' && (
          <div className="space-y-4">
            <div className="p-4 bg-[#FFFFFF] border border-[#E2E8F0] rounded-xl font-bold text-sm text-[#00A86B]">
              GPA & Results for {selectedProgram} ({filteredStudents.length} Students)
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredStudents.map((res) => (
                <div key={res.id} onClick={() => setSelectedStudent(res)} className="bg-[#FFFFFF] border border-[#E2E8F0] p-5 rounded-2xl flex justify-between items-center cursor-pointer hover:border-[#00A86B] transition shadow-sm">
                  <div>
                    <div className="text-xs text-[#00A86B] font-mono font-bold">{res.id}</div>
                    <h4 className="font-bold text-base mt-1 text-[#1A2E26]">{res.name}</h4>
                    <p className="text-xs text-[#1A2E26]/60 mt-0.5">{res.semester}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-black text-[#00A86B]">GPA {res.gpa}</span>
                    <div className="text-xs text-[#1A2E26] font-bold mt-1">Grade: {res.grade}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>

      {/* Student Details Complete Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 bg-[#1A2E26]/50 flex justify-center items-center z-50 p-4 backdrop-blur-xs">
          <div className="bg-[#FFFFFF] border border-[#E2E8F0] rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
            <button 
              onClick={() => setSelectedStudent(null)}
              className="absolute top-4 right-4 bg-[#F4F7F6] hover:bg-[#E2E8F0] text-[#1A2E26] w-8 h-8 rounded-full flex items-center justify-center font-bold"
            >
              ✕
            </button>

            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-full bg-[#1A2E26] text-white text-2xl font-bold flex items-center justify-center">
                {selectedStudent.name.charAt(0)}
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#1A2E26]">{selectedStudent.name}</h3>
                <span className="text-xs font-mono text-[#00A86B] font-bold">{selectedStudent.id}</span>
              </div>
            </div>

            <div className="space-y-3 bg-[#F4F7F6] p-4 rounded-xl border border-[#E2E8F0] text-sm">
              <div>
                <span className="font-bold text-[#1A2E26]/60 block text-xs uppercase">Email Address</span>
                <p className="font-semibold text-[#1A2E26]">{selectedStudent.email}</p>
              </div>
              <div>
                <span className="font-bold text-[#1A2E26]/60 block text-xs uppercase">Program</span>
                <p className="font-semibold text-[#1A2E26]">{selectedStudent.program}</p>
              </div>
              <div>
                <span className="font-bold text-[#1A2E26]/60 block text-xs uppercase">Semester</span>
                <p className="font-semibold text-[#1A2E26]">{selectedStudent.semester}</p>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <span className="font-bold text-[#1A2E26]/60 block text-xs uppercase">Attendance</span>
                  <p className="font-semibold text-[#00A86B]">{selectedStudent.attendance}</p>
                </div>
                <div>
                  <span className="font-bold text-[#1A2E26]/60 block text-xs uppercase">GPA / Grade</span>
                  <p className="font-semibold text-[#1A2E26]">{selectedStudent.gpa} ({selectedStudent.grade})</p>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button 
                onClick={() => handleRemoveStudent(selectedStudent.id)}
                className="bg-red-600 hover:bg-red-700 text-white text-sm px-4 py-2 rounded-xl font-semibold transition flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" /> Remove Student
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add New Student Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-[#1A2E26]/50 flex justify-center items-center z-50 p-4 backdrop-blur-xs">
          <div className="bg-[#FFFFFF] border border-[#E2E8F0] rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
            <button 
              onClick={() => setShowAddModal(false)}
              className="absolute top-4 right-4 bg-[#F4F7F6] hover:bg-[#E2E8F0] text-[#1A2E26] w-8 h-8 rounded-full flex items-center justify-center font-bold"
            >
              ✕
            </button>

            <h3 className="text-xl font-bold text-[#1A2E26] mb-4">Add New Student</h3>

            <form onSubmit={handleAddStudentSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#1A2E26]/60 uppercase mb-1">Full Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Ali Ahmed"
                  value={newStudent.name}
                  onChange={(e) => setNewStudent({...newStudent, name: e.target.value})}
                  className="w-full bg-[#F4F7F6] border border-[#E2E8F0] p-2.5 rounded-xl text-sm outline-none focus:border-[#00A86B]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1A2E26]/60 uppercase mb-1">Email Address</label>
                <input 
                  type="email" 
                  required
                  placeholder="ali.ahmed@example.com"
                  value={newStudent.email}
                  onChange={(e) => setNewStudent({...newStudent, email: e.target.value})}
                  className="w-full bg-[#F4F7F6] border border-[#E2E8F0] p-2.5 rounded-xl text-sm outline-none focus:border-[#00A86B]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#1A2E26]/60 uppercase mb-1">Program</label>
                  <select 
                    value={newStudent.program}
                    onChange={(e) => setNewStudent({...newStudent, program: e.target.value})}
                    className="w-full bg-[#F4F7F6] border border-[#E2E8F0] p-2 rounded-xl text-xs font-bold text-[#1A2E26]"
                  >
                    {BS_PROGRAMS.map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1A2E26]/60 uppercase mb-1">Semester</label>
                  <select 
                    value={newStudent.semester}
                    onChange={(e) => setNewStudent({...newStudent, semester: e.target.value})}
                    className="w-full bg-[#F4F7F6] border border-[#E2E8F0] p-2 rounded-xl text-xs font-bold text-[#1A2E26]"
                  >
                    {['Semester 1', 'Semester 2', 'Semester 3', 'Semester 4'].map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3 pt-4 border-t border-[#E2E8F0]">
                <button 
                  type="button" 
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-sm font-semibold text-[#1A2E26]/60 hover:text-[#1A2E26]"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="bg-[#00A86B] hover:bg-[#008f5a] text-white px-5 py-2 rounded-xl font-bold text-sm shadow-sm transition"
                >
                  Save Student
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}