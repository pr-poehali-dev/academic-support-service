import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

export default function Index() {
  const [workType, setWorkType] = useState('');
  const [complexity, setComplexity] = useState('');
  const [deadline, setDeadline] = useState('');
  const [calculatedPrice, setCalculatedPrice] = useState(0);
  const [chatOpen, setChatOpen] = useState(false);
  const [selectedExpert, setSelectedExpert] = useState('');
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  const [consultantOpen, setConsultantOpen] = useState(false);
  const [cabinetOpen, setCabinetOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [user, setUser] = useState({ name: 'Алексей Иванов', email: 'alexey@example.com', phone: '+7 (999) 123-45-67' });

  const calculatePrice = () => {
    let basePrice = 0;
    const complexityMultiplier = complexity === 'simple' ? 1 : complexity === 'medium' ? 1.5 : 2.5;
    const deadlineMultiplier = deadline === 'urgent' ? 2 : deadline === 'week' ? 1.3 : 1;
    
    switch (workType) {
      case 'coursework': basePrice = 3000; break;
      case 'diploma': basePrice = 15000; break;
      case 'control': basePrice = 1500; break;
      case 'referat': basePrice = 800; break;
      case 'website': basePrice = 25000; break;
      case 'presentation': basePrice = 2000; break;
    }
    
    const total = basePrice * complexityMultiplier * deadlineMultiplier;
    setCalculatedPrice(total);
  };

  React.useEffect(() => {
    if (workType && complexity && deadline) {
      calculatePrice();
    }
  }, [workType, complexity, deadline]);

  const teamMembers = [
    {
      name: 'Артём',
      role: 'Руководитель проекта',
      specialty: 'IT и облачные технологии',
      description: 'Участник сборной России по компетенции «Облачные технологии» (WorldSkills Russia), призёр и победитель национальных этапов.',
      expertise: ['IT-проекты', 'Веб-разработка', 'AWS', 'DevOps', 'Техническая архитектура'],
      avatar: '👨‍💻',
      online: true,
      responseTime: '5 мин'
    },
    {
      name: 'Вячеслав',
      role: 'Инженер-аналитик',
      specialty: 'Технические и экономические дисциплины',
      description: 'Опыт в проектировании, расчётах, технико-экономическом анализе. Работает с AutoCAD, Excel, Revit, КОМПАС-3D.',
      expertise: ['Строительные чертежи', 'Сопромат', 'Теплотехника', 'Экономика предприятия', 'Бизнес-планы'],
      avatar: '👨‍🔧',
      online: true,
      responseTime: '10 мин'
    },
    {
      name: 'Ляна',
      role: 'Эксперт гуманитарных наук',
      specialty: 'Гуманитарные и социальные науки',
      description: 'Фокус на качественное научное исследование, методологическую строгость и актуальность.',
      expertise: ['Психология', 'Педагогика', 'Социология', 'Философия', 'Лингвистика', 'Право'],
      avatar: '👩‍🎓',
      online: false,
      responseTime: '30 мин'
    },
    {
      name: 'Елена',
      role: 'Методолог и редактор',
      specialty: 'Структурирование научных работ',
      description: 'Специализируется на структурировании научных работ, проверке логики, соответствию методическим требованиям.',
      expertise: ['Редактура', 'Оформление по ГОСТ', 'Антиплагиат', 'Презентации', 'Рецензии'],
      avatar: '👩‍💼',
      online: true,
      responseTime: '15 мин'
    },
    {
      name: 'Вика',
      role: 'Frontend-разработчик',
      specialty: 'UX и презентационные материалы',
      description: 'Создаёт удобные интерфейсы, адаптивные сайты, интерактивные презентации и визуальные компоненты проектов.',
      expertise: ['Дизайн презентаций', 'Веб-интерфейсы', 'Инфографика', 'UX-дизайн', 'IT-проекты'],
      avatar: '👩‍🎨',
      online: true,
      responseTime: '3 мин'
    }
  ];

  const orders = [
    {
      id: '#2024-001',
      title: 'Курсовая работа по экономике',
      status: 'completed',
      progress: 100,
      expert: 'Вячеслав',
      deadline: '2024-01-15',
      price: 4500,
      files: ['kursovaya_ekonomika.docx', 'prezentaciya.pptx']
    },
    {
      id: '#2024-002',
      title: 'Дипломная работа по IT',
      status: 'in_progress',
      progress: 75,
      expert: 'Артём',
      deadline: '2024-02-28',
      price: 25000,
      files: ['chapter1.docx', 'chapter2.docx']
    },
    {
      id: '#2024-003',
      title: 'Реферат по психологии',
      status: 'pending',
      progress: 0,
      expert: 'Ляна',
      deadline: '2024-01-20',
      price: 1200,
      files: []
    }
  ];

  const documents = [
    { name: 'kursovaya_ekonomika.docx', type: 'docx', size: '2.4 MB', date: '2024-01-15', orderId: '#2024-001' },
    { name: 'prezentaciya.pptx', type: 'pptx', size: '8.1 MB', date: '2024-01-15', orderId: '#2024-001' },
    { name: 'chapter1.docx', type: 'docx', size: '1.8 MB', date: '2024-01-10', orderId: '#2024-002' },
    { name: 'chapter2.docx', type: 'docx', size: '2.1 MB', date: '2024-01-12', orderId: '#2024-002' },
    { name: 'metodichka.pdf', type: 'pdf', size: '15.6 MB', date: '2024-01-08', orderId: null }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'in_progress': return 'bg-blue-500';
      case 'pending': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'Завершён';
      case 'in_progress': return 'В работе';
      case 'pending': return 'Ожидает';
      default: return 'Неизвестно';
    }
  };

  const handleLogin = () => {
    if (loginForm.email && loginForm.password) {
      setIsLoggedIn(true);
    }
  };

  const services = [
    { title: 'Курсовые и дипломные работы', icon: 'GraduationCap', description: 'По любому направлению с соблюдением ГОСТ' },
    { title: 'Технические расчёты', icon: 'Calculator', description: 'Чертежи, проекты, инженерные решения' },
    { title: 'IT-разработка', icon: 'Code', description: 'Сайты, приложения, облачная инфраструктура' },
    { title: 'Бизнес-планы', icon: 'TrendingUp', description: 'Отчёты по практике, статистическая обработка' },
    { title: 'Подготовка к защите', icon: 'Presentation', description: 'Презентации, доклады, ответы на вопросы' },
    { title: 'Редактура и корректура', icon: 'FileText', description: 'Проверка на антиплагиат, оформление по ГОСТ' }
  ];

  const principles = [
    { title: 'Индивидуальный подход', icon: 'User', description: 'Работа пишется с нуля под ваши требования' },
    { title: 'Гарантия срока', icon: 'Clock', description: 'Даже срочные проекты от 24 часов' },
    { title: 'Высокое качество', icon: 'Award', description: 'Проверка логики, структуры и уникальности' },
    { title: 'Конфиденциальность', icon: 'Shield', description: 'Ни один заказ не разглашается' }
  ];

  const faqItems = [
    {
      question: 'Какие гарантии качества вы предоставляете?',
      answer: 'Мы гарантируем высокое качество работ, проверку на уникальность, соблюдение ГОСТ и методических требований. Каждый проект проходит внутренний аудит минимум двумя специалистами.'
    },
    {
      question: 'Как быстро выполняются срочные заказы?',
      answer: 'Срочные проекты выполняем от 24 часов. Точные сроки зависят от объёма и сложности работы. Всегда соблюдаем договорённые сроки.'
    },
    {
      question: 'Предоставляете ли вы поддержку до защиты?',
      answer: 'Да, мы консультируем по возражениям и доработкам до успешной защиты. Это входит в стоимость услуги.'
    },
    {
      question: 'Работаете ли вы с техническими специальностями?',
      answer: 'Да, наша команда включает инженера-аналитика с опытом работы в AutoCAD, Excel, Revit, КОМПАС-3D. Выполняем расчёты, чертежи, технические проекты.'
    }
  ];

  return (
    <div className="min-h-screen bg-white font-source">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="GraduationCap" className="text-primary" size={32} />
            <span className="font-inter font-bold text-xl text-secondary">Команда Артёма</span>
          </div>
          <nav className="hidden md:flex space-x-6">
            <a href="#services" className="text-secondary hover:text-primary transition-colors">Услуги</a>
            <a href="#team" className="text-secondary hover:text-primary transition-colors">Команда</a>
            <a href="#calculator" className="text-secondary hover:text-primary transition-colors">Калькулятор</a>
            <a href="#contact" className="text-secondary hover:text-primary transition-colors">Контакты</a>
          </nav>
          <div className="flex items-center space-x-3">
            <Dialog open={cabinetOpen} onOpenChange={setCabinetOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
                  <Icon name="User" className="mr-2" size={16} />
                  Личный кабинет
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="font-inter text-2xl">
                    {isLoggedIn ? 'Личный кабинет' : 'Вход в личный кабинет'}
                  </DialogTitle>
                </DialogHeader>
                
                {!isLoggedIn ? (
                  <div className="space-y-4 max-w-md mx-auto">
                    <div>
                      <label className="block text-sm font-medium mb-2">Email</label>
                      <Input 
                        type="email"
                        placeholder="your@email.com"
                        value={loginForm.email}
                        onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Пароль</label>
                      <Input 
                        type="password"
                        placeholder="••••••••"
                        value={loginForm.password}
                        onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                      />
                    </div>
                    <Button 
                      className="w-full bg-primary hover:bg-primary/90 text-white"
                      onClick={handleLogin}
                      disabled={!loginForm.email || !loginForm.password}
                    >
                      Войти
                    </Button>
                    <p className="text-sm text-muted-foreground text-center">
                      Нет аккаунта? <span className="text-primary cursor-pointer hover:underline">Зарегистрироваться</span>
                    </p>
                  </div>
                ) : (
                  <Tabs defaultValue="orders" className="w-full">
                    <TabsList className="grid w-full grid-cols-4">
                      <TabsTrigger value="orders">Заказы</TabsTrigger>
                      <TabsTrigger value="documents">Документы</TabsTrigger>
                      <TabsTrigger value="profile">Профиль</TabsTrigger>
                      <TabsTrigger value="settings">Настройки</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="orders" className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-inter font-semibold text-lg">История заказов</h3>
                        <Badge variant="secondary">{orders.length} заказов</Badge>
                      </div>
                      
                      <div className="grid gap-4">
                        {orders.map((order) => (
                          <Card key={order.id} className="hover:shadow-md transition-shadow">
                            <CardContent className="p-6">
                              <div className="flex items-start justify-between mb-4">
                                <div>
                                  <div className="flex items-center space-x-2 mb-1">
                                    <h4 className="font-medium">{order.title}</h4>
                                    <Badge className={`${getStatusColor(order.status)} text-white text-xs`}>
                                      {getStatusText(order.status)}
                                    </Badge>
                                  </div>
                                  <p className="text-sm text-muted-foreground">ID: {order.id}</p>
                                  <p className="text-sm text-muted-foreground">Эксперт: {order.expert}</p>
                                </div>
                                <div className="text-right">
                                  <p className="font-semibold text-lg text-primary">{order.price.toLocaleString()} ₽</p>
                                  <p className="text-sm text-muted-foreground">до {order.deadline}</p>
                                </div>
                              </div>
                              
                              {order.status === 'in_progress' && (
                                <div className="mb-4">
                                  <div className="flex justify-between text-sm mb-1">
                                    <span>Прогресс</span>
                                    <span>{order.progress}%</span>
                                  </div>
                                  <Progress value={order.progress} className="h-2" />
                                </div>
                              )}
                              
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                  <Icon name="FileText" size={16} className="text-muted-foreground" />
                                  <span className="text-sm text-muted-foreground">
                                    {order.files.length} файлов
                                  </span>
                                </div>
                                <div className="flex space-x-2">
                                  <Button size="sm" variant="outline">
                                    <Icon name="MessageCircle" className="mr-2" size={14} />
                                    Чат
                                  </Button>
                                  <Button size="sm" variant="outline">
                                    <Icon name="Download" className="mr-2" size={14} />
                                    Скачать
                                  </Button>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="documents" className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-inter font-semibold text-lg">Мои документы</h3>
                        <Badge variant="secondary">{documents.length} файлов</Badge>
                      </div>
                      
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Название</TableHead>
                            <TableHead>Размер</TableHead>
                            <TableHead>Дата</TableHead>
                            <TableHead>Заказ</TableHead>
                            <TableHead>Действия</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {documents.map((doc, index) => (
                            <TableRow key={index}>
                              <TableCell className="flex items-center space-x-2">
                                <Icon name="FileText" size={16} className="text-muted-foreground" />
                                <span>{doc.name}</span>
                              </TableCell>
                              <TableCell className="text-muted-foreground">{doc.size}</TableCell>
                              <TableCell className="text-muted-foreground">{doc.date}</TableCell>
                              <TableCell>
                                {doc.orderId ? (
                                  <Badge variant="outline">{doc.orderId}</Badge>
                                ) : (
                                  <span className="text-muted-foreground">—</span>
                                )}
                              </TableCell>
                              <TableCell>
                                <div className="flex space-x-1">
                                  <Button size="sm" variant="ghost">
                                    <Icon name="Download" size={14} />
                                  </Button>
                                  <Button size="sm" variant="ghost">
                                    <Icon name="Share" size={14} />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TabsContent>
                    
                    <TabsContent value="profile" className="space-y-4">
                      <h3 className="font-inter font-semibold text-lg">Профиль пользователя</h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-lg">Личная информация</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium mb-2">Имя</label>
                              <Input value={user.name} readOnly />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-2">Email</label>
                              <Input value={user.email} readOnly />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-2">Телефон</label>
                              <Input value={user.phone} readOnly />
                            </div>
                            <Button variant="outline" className="w-full">
                              <Icon name="Edit" className="mr-2" size={16} />
                              Редактировать
                            </Button>
                          </CardContent>
                        </Card>
                        
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-lg">Статистика</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-4">
                              <div className="flex justify-between">
                                <span>Всего заказов</span>
                                <Badge variant="secondary">{orders.length}</Badge>
                              </div>
                              <div className="flex justify-between">
                                <span>Завершено</span>
                                <Badge className="bg-green-500 text-white">
                                  {orders.filter(o => o.status === 'completed').length}
                                </Badge>
                              </div>
                              <div className="flex justify-between">
                                <span>В работе</span>
                                <Badge className="bg-blue-500 text-white">
                                  {orders.filter(o => o.status === 'in_progress').length}
                                </Badge>
                              </div>
                              <div className="flex justify-between">
                                <span>Потрачено</span>
                                <span className="font-semibold text-primary">
                                  {orders.reduce((sum, o) => sum + o.price, 0).toLocaleString()} ₽
                                </span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="settings" className="space-y-4">
                      <h3 className="font-inter font-semibold text-lg">Настройки</h3>
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Уведомления</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="flex items-center justify-between">
                            <span>Email уведомления</span>
                            <input type="checkbox" defaultChecked className="toggle" />
                          </div>
                          <div className="flex items-center justify-between">
                            <span>SMS уведомления</span>
                            <input type="checkbox" className="toggle" />
                          </div>
                          <div className="flex items-center justify-between">
                            <span>Push уведомления</span>
                            <input type="checkbox" defaultChecked className="toggle" />
                          </div>
                        </CardContent>
                      </Card>
                      
                      <div className="flex justify-between pt-4">
                        <Button variant="outline" onClick={() => setIsLoggedIn(false)}>
                          <Icon name="LogOut" className="mr-2" size={16} />
                          Выйти
                        </Button>
                        <Button variant="destructive">
                          <Icon name="Trash" className="mr-2" size={16} />
                          Удалить аккаунт
                        </Button>
                      </div>
                    </TabsContent>
                  </Tabs>
                )}
              </DialogContent>
            </Dialog>
            
            <Button className="bg-primary hover:bg-primary/90 text-white">
              <Icon name="MessageCircle" className="mr-2" size={16} />
              Telegram
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-accent via-white to-accent/50">
        <div className="max-w-6xl mx-auto px-4 text-center animate-fade-in">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">Академическая поддержка</Badge>
          <h1 className="font-inter font-bold text-4xl md:text-5xl text-secondary mb-6 leading-tight">
            Профессиональная академическая<br />
            <span className="text-primary">и техническая поддержка</span><br />
            для студентов
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
            Качественно. Своевременно. Конфиденциально.<br />
            Команда из пяти специалистов поможет вам успешно пройти все этапы обучения: 
            от курсовой работы до защиты диплома.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white">
              <Icon name="MessageCircle" className="mr-2" size={20} />
              Написать в Telegram
            </Button>
            <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
              <Icon name="Calculator" className="mr-2" size={20} />
              Рассчитать стоимость
            </Button>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-inter font-bold text-3xl text-secondary mb-4">Что мы предлагаем</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Полный спектр академических и технических услуг</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300 border-accent animate-scale-in" 
                    style={{ animationDelay: `${index * 0.1}s` }}>
                <CardHeader className="text-center">
                  <Icon name={service.icon as any} className="mx-auto text-primary mb-3" size={48} />
                  <CardTitle className="font-inter text-lg">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section id="team" className="py-16 bg-accent/30">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-inter font-bold text-3xl text-secondary mb-4">Наша команда</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Пять профессионалов с глубокой предметной экспертизой</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamMembers.map((member, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 bg-white border-accent animate-fade-in"
                    style={{ animationDelay: `${index * 0.15}s` }}>
                <CardHeader className="text-center">
                  <div className="text-4xl mb-3">{member.avatar}</div>
                  <CardTitle className="font-inter text-xl">{member.name}</CardTitle>
                  <p className="text-primary font-medium">{member.role}</p>
                  <p className="text-sm text-muted-foreground">{member.specialty}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{member.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {member.expertise.map((skill, skillIndex) => (
                      <Badge key={skillIndex} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t">
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${member.online ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                      <span className="text-xs text-muted-foreground">
                        {member.online ? 'Онлайн' : 'Офлайн'}
                      </span>
                    </div>
                    <span className="text-xs text-muted-foreground">~{member.responseTime}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Calculator */}
      <section id="calculator" className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-inter font-bold text-3xl text-secondary mb-4">Калькулятор стоимости</h2>
            <p className="text-muted-foreground">Узнайте приблизительную стоимость вашего проекта</p>
          </div>
          <Card className="animate-scale-in">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-secondary mb-2">Тип работы</label>
                  <Select value={workType} onValueChange={setWorkType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите тип" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="coursework">Курсовая работа</SelectItem>
                      <SelectItem value="diploma">Дипломная работа</SelectItem>
                      <SelectItem value="control">Контрольная работа</SelectItem>
                      <SelectItem value="referat">Реферат</SelectItem>
                      <SelectItem value="website">Веб-сайт</SelectItem>
                      <SelectItem value="presentation">Презентация</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary mb-2">Сложность</label>
                  <Select value={complexity} onValueChange={setComplexity}>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите сложность" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="simple">Простая</SelectItem>
                      <SelectItem value="medium">Средняя</SelectItem>
                      <SelectItem value="complex">Высокая</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary mb-2">Срок</label>
                  <Select value={deadline} onValueChange={setDeadline}>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите срок" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="month">Месяц и более</SelectItem>
                      <SelectItem value="week">Неделя</SelectItem>
                      <SelectItem value="urgent">Срочно (1-3 дня)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              {calculatedPrice > 0 && (
                <div className="text-center p-6 bg-accent/50 rounded-lg animate-fade-in">
                  <div className="text-3xl font-bold text-primary mb-2">
                    {calculatedPrice.toLocaleString('ru-RU')} ₽
                  </div>
                  <p className="text-muted-foreground text-sm mb-4">
                    Приблизительная стоимость проекта
                  </p>
                  <Button className="bg-primary hover:bg-primary/90 text-white">
                    <Icon name="MessageCircle" className="mr-2" size={16} />
                    Обсудить проект
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Principles */}
      <section className="py-16 bg-accent/30">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-inter font-bold text-3xl text-secondary mb-4">Наши принципы</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {principles.map((principle, index) => (
              <div key={index} className="text-center animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <Icon name={principle.icon as any} className="mx-auto text-primary mb-4" size={48} />
                <h3 className="font-inter font-semibold text-lg text-secondary mb-2">{principle.title}</h3>
                <p className="text-muted-foreground text-sm">{principle.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-inter font-bold text-3xl text-secondary mb-4">Часто задаваемые вопросы</h2>
          </div>
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="font-inter font-medium text-left">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Contact CTA */}
      <section id="contact" className="py-20 bg-gradient-to-br from-primary to-primary/80 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center animate-fade-in">
          <h2 className="font-inter font-bold text-3xl mb-6">Готовы помочь уже сегодня</h2>
          <p className="text-lg mb-8 text-primary-foreground/90">
            Напишите нам в Telegram — обсудим ваш проект, сроки и бюджет.<br />
            Первая консультация бесплатна.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90">
              <Icon name="MessageCircle" className="mr-2" size={20} />
              @GrekExpert
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
              <Icon name="Phone" className="mr-2" size={20} />
              Заказать звонок
            </Button>
          </div>
        </div>
      </section>

      {/* Online Consultant Widget */}
      <div className="fixed bottom-4 right-4 z-50">
        <Dialog open={consultantOpen} onOpenChange={setConsultantOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90 text-white shadow-lg rounded-full w-16 h-16 animate-pulse">
              <Icon name="MessageSquare" size={24} />
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="font-inter text-xl">Онлайн-консультант</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <p className="text-muted-foreground">Выберите эксперта по вашей специализации:</p>
              
              <div className="space-y-3">
                {teamMembers.map((member, index) => (
                  <div key={index} 
                       className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                         selectedExpert === member.name 
                           ? 'border-primary bg-primary/5' 
                           : 'border-gray-200 hover:border-primary/50'
                       }`}
                       onClick={() => setSelectedExpert(member.name)}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{member.avatar}</span>
                        <div>
                          <div className="flex items-center space-x-2">
                            <h4 className="font-medium">{member.name}</h4>
                            <div className={`w-2 h-2 rounded-full ${member.online ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                          </div>
                          <p className="text-sm text-muted-foreground">{member.role}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant={member.online ? 'default' : 'secondary'} className="text-xs">
                          {member.online ? 'Онлайн' : 'Офлайн'}
                        </Badge>
                        <p className="text-xs text-muted-foreground mt-1">~{member.responseTime}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {selectedExpert && (
                <div className="space-y-3 border-t pt-4 animate-fade-in">
                  <Input 
                    placeholder="Ваше имя" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)}
                  />
                  <Textarea 
                    placeholder="Опишите ваш вопрос или проект..." 
                    value={message} 
                    onChange={(e) => setMessage(e.target.value)}
                    rows={3}
                  />
                  <Button 
                    className="w-full bg-primary hover:bg-primary/90 text-white"
                    disabled={!name || !message}
                    onClick={() => {
                      // Здесь будет отправка сообщения
                      alert(`Сообщение отправлено эксперту ${selectedExpert}!`);
                      setConsultantOpen(false);
                      setName('');
                      setMessage('');
                      setSelectedExpert('');
                    }}
                  >
                    <Icon name="Send" className="mr-2" size={16} />
                    Отправить сообщение
                  </Button>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Footer */}
      <footer className="bg-secondary text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Icon name="GraduationCap" size={24} />
                <span className="font-inter font-bold text-lg">Команда Артёма</span>
              </div>
              <p className="text-gray-300 text-sm">
                Профессиональная академическая и техническая поддержка для студентов
              </p>
            </div>
            <div>
              <h3 className="font-inter font-semibold mb-4">Услуги</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>Курсовые и дипломные работы</li>
                <li>Технические расчёты</li>
                <li>IT-разработка</li>
                <li>Бизнес-планы</li>
              </ul>
            </div>
            <div>
              <h3 className="font-inter font-semibold mb-4">Контакты</h3>
              <div className="space-y-2 text-sm text-gray-300">
                <div className="flex items-center space-x-2">
                  <Icon name="MessageCircle" size={16} />
                  <span>@GrekExpert</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Clock" size={16} />
                  <span>Работаем 24/7</span>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
            © 2024 Команда Артёма. Академическая и техническая поддержка студентов.
          </div>
        </div>
      </footer>
    </div>
  );
}