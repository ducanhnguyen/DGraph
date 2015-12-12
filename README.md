# DGraph
Hiển thị đồ thị phụ thuộc theo layer

# Input
Gồm hai file json: file mô tả cấu trúc(data/Structure.json), file mô tả các sự phụ thuộc(data/Dependency.json)

#Output
Đồ thị phụ thuộc dạng layer. Các chức năng cơ bản:
* Di chuyển một Node
* Nháy đúp một Node để mở rộng hoặc thu hẹp
* Nháy chuột phải một Node để thêm danh sách id bị tác động vào tập change set, hoặc loại bỏ danh sách id khỏi change set

#Change Set
Mỗi một phần tử trong tập change set là ID một Node.

Danh sách change set được lưu trong mảng *changeSet* trong file *changeSet.js*
