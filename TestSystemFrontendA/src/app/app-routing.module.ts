import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { AdminGuard } from './services/admin.guard';
import { UserGuard } from './services/user.guard';
import { ProfileComponent } from './pages/profile/profile.component';
import { WelcomeComponent } from './pages/admin/welcome/welcome.component';
import { ViewCategoryComponent } from './pages/admin/view-category/view-category.component';
import { AddCategoryComponent } from './pages/admin/add-category/add-category.component';
import { ViewTestComponent } from './pages/admin/view-test/view-test.component';
import { AddExamComponent } from './pages/admin/add-exam/add-exam.component';
import { UpdateExamComponent } from './pages/admin/update-exam/update-exam.component';
import { ViewExamQuestionComponent } from './pages/admin/view-exam-question/view-exam-question.component';
import { AddQuestionComponent } from './pages/admin/add-question/add-question.component';
import { UpdateQuestionComponent } from './pages/admin/update-question/update-question.component';
import { LoadExamComponent } from './pages/user/load-exam/load-exam.component';
import { InstructionsComponent } from './pages/user/instructions/instructions.component';
import { StartComponent } from './pages/user/start/start.component';

const routes: Routes = [
  {//Cuando se entre a cualquier ruta vacia se va a diriguir a este componente
    path:'',
    component:HomeComponent,
    pathMatch:'full',//Si no coincide nungua ruta se dirige a la ruta indicada
  },{
    path:'signup',
    component:SignupComponent,
    pathMatch:'full'
  },{
    path:'login',
    component:LoginComponent,
    pathMatch:'full'
  },{
    path:'admin',
    component:DashboardComponent,
    canActivate:[AdminGuard],
    children:[//me permite acceder al hijo desde el path (/admin/profile)
      {
        path:'profile',
        component:ProfileComponent
      },{
        path:'',
        component:WelcomeComponent
      },{
        path:'categories',
        component:ViewCategoryComponent
      },{
        path:'add-categories',
        component:AddCategoryComponent
      },{
        path:'tests',
        component:ViewTestComponent
      },{
        path:'add-exams',
        component:AddExamComponent
      },{
        path:'update-exam/:id',
        component:UpdateExamComponent
      },{
        path:'see-questions/:examId/:title',
        component:ViewExamQuestionComponent
      },{
        path:'add-question/:examId/:title',
        component: AddQuestionComponent
      },{
        path:'update-question/:questionId',
        component: UpdateQuestionComponent
      }
    ]
  },{
    path:'user',
    component:UserDashboardComponent,
    canActivate:[UserGuard],
    children:[
      {
        path:':catId',
        component:LoadExamComponent
      },{
        path:'instructions/:examId',
        component:InstructionsComponent
      }
    ]
  },{
    path:'start/:examId',
    component:StartComponent,
    canActivate:[UserGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
