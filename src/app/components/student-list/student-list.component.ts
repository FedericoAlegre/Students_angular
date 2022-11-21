import { Component, Input, OnInit } from '@angular/core';
import { StudentServiceService } from 'src/app/services/student-service.service';
import { Student } from 'src/app/models/Student';
import { NgModel } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {

  studentList = new Array<Student>();
  @Input() dni: string
  @Input() Apellido: string
  @Input() Nombre: string
  @Input() email: string
  @Input() id: number

  @Input() dni2: string
  @Input() Apellido2: string
  @Input() Nombre2: string
  @Input() email2: string
  @Input() id2: number
  constructor(private studentService: StudentServiceService,private modalService:NgbModal) { }

  ngOnInit(): void {
    this.getAll()
  }

  getAll(){
    this.studentService.getAll().subscribe(respuesta =>{
      this.studentList = respuesta;
      this.dni=''
      this.Apellido=''
      this.Nombre=''
      this.email=''
      document.getElementsByTagName('input')[0].focus()
    })
  }

  save(){
    let newStudent = new Student
    newStudent.dni = this.dni
    newStudent.firstName = this.Nombre
    newStudent.lastName = this.Apellido
    newStudent.email = this.email
    newStudent.cohort = 0
    newStudent.status = 'activo'
    newStudent.gender = 'masculin'
    newStudent.adrees = 'abc123'
    newStudent.phone = '000'
    this.studentService.save(newStudent).subscribe(()=>{
      location.reload();
    },error =>{
      console.log(error.error.message)
    })
  }

delete(id:number){
  this.studentService.delete(id).subscribe(()=>{
  location.reload()
},error=>{
  console.log(error.error.message)
})
}  

view(ver:any, s:Student){
  this.id2 = s.id
  this.dni2 = s.dni
  this.Nombre2 = s.firstName
  this.Apellido2 = s.lastName
  this.email2 = s.email
  this.modalService.open(ver).result.then(()=>{
    let newStudent = new Student
    newStudent.id=this.id2
    newStudent.dni = this.dni2
    newStudent.firstName = this.Nombre2
    newStudent.lastName = this.Apellido2
    newStudent.email = this.email2
    newStudent.cohort = 0
    newStudent.status = 'activo'
    newStudent.gender = 'masculino'
    newStudent.adrees = 'abc123'
    newStudent.phone = '000'
    this.studentService.edit(newStudent).subscribe(()=>{
      location.reload();
    },error =>{
      console.log(error.error.message)
    })    
  })
}
}
