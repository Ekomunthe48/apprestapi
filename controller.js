'use strict';

var response = require('./res');
var connection = require('./koneksi');
const conn = require('./koneksi');

exports.index = function(req,res){
    response.ok("Aplikasi REST API ku berjalan",res)
};

//menampilkan data mahasiswa
exports.tampilsemuamahasiswa = function(req,res){
    connection.query("SELECT * FROM mahasiswa", function(error, rows, fileds)
    {
        if(error){
            connection.log(error);
        }else {
            response.ok(rows, res)
        }
    });
};

//menampilkan data mahasiswa berdasarkan id
exports.tampilberdasarkanid = function(req,res){
    let id = req.params.id;
    connection.query('SELECT * FROM mahasiswa WHERE id_mahasiswa = ?', [id],
    function(error, rows, fileds){
        if(error){
            console.log(error);
        }else{
            response.ok(rows, res)
        }
    });

};

//menambahkan data mahasiswa
exports.tambahMahasiswa = function(req,res){
    var nim =req.body.nim;
    var nama = req.body.nama;
    var jurusan = req.body.jurusan;

    connection.query('INSERT INTO mahasiswa (nim,nama,jurusan) VALUES(?,?,?)', [nim,nama,jurusan],
    
    function (error, rows,fileds){
        if(error){
        console.log(error);
        }else {
            response.ok("Berhasil menambahkan data mahasiswa",res)
        }
    }
    );
};

// mengubah data berdasarkan id
exports.ubahMahasiswa = function(req,res){
    var id = req.body.id_mahasiswa;
    var nim =req.body.nim;
    var nama = req.body.nama;
    var jurusan = req.body.jurusan;
    
    connection.query('UPDATE mahasiswa SET nim=?, nama=?, jurusan=? WHERE id_mahasiswa=?', [nim,nama,jurusan,id],
    function(error, rows, fileds){
        if(error){
            console.log(error);
        }else{
            response.ok("Berhasil Ubah Data", res)
        }
    });

};

// menghapus data berdasarkan id
exports.hapusDatamahasiswa = function(req,res){
    var id = req.body.id_mahasiswa;

    connection.query('DELETE FROM mahasiswa WHERE id_mahasiswa=?',[id],
    function(error, rows, fileds){
        if(error){
            console.log(error);
        }else{
            response.ok("Berhasil Menghapus Data", res)
        }
    });

};

//menampilkan matakuliah group

exports.tampilGroupmatakuliah = function (req,res){
    connection.query('SELECT mahasiswa.id_mahasiswa, mahasiswa.nim, mahasiswa.nama, mahasiswa.jurusan, matakulia.id_matakuliah, matakulia.matakuliah, matakulia.sks FROM krs JOIN matakulia JOIN mahasiswa WHERE krs.id_matakuliah = matakulia.id_matakuliah AND krs.id_mahasiswa = mahasiswa.id_mahasiswa ORDER BY mahasiswa.id_mahasiswa',
        function(error, rows, fileds){
           if(error){
               console.log(error);
           } else{
               response.oknested(rows, res);
           }
        }
    )
}
